---
years: "2019"
date: 2019-02-28 08:42:07
author: tltoulson
url: /blog/prepare-your-import-sets-for-rollback
title: "Prepare Your Import Sets for Rollback"
socialImg: images/social.png
description: Few things are worse than performing a bulk import of data into ServiceNow only to realize you got something horribly wrong in the Transform Map. Recently I have been toying with a combination of pre-import steps that can be taken to enable rolling back these changes.
---

Few things are worse than performing a bulk import of data into ServiceNow only to realize you got something horribly wrong in the Transform Map. With a well planned coalesce, this often won't create an issue since you can just reimport and overwrite. But sometimes things don't go as planned and we need the nuclear option. Up until this point, I am still unaware of any baseline method of rollback for import sets.

So, recently I have been toying with a combination of pre-import steps that can be taken to enable rolling back imports. While not a true database transaction rollback, it can help recover from 'oops'.

## Import Set Rollback Process

So let's take a quick look at the process before breaking it down.

**Preparation Steps**

Execute these steps before running any import:

1. Export XML from all tables you plan to import
2. Add a tag to identify all newly imported records
3. Change the **Choice action** option on field maps to **reject**

**Recovery Steps**

Execute these steps after a botched import to recover:

1. Delete all records tagged with your imported tag
2. Import the previously exported XML

## Preparation Steps

In order to rollback an import set, we need to make sure we capture certain pieces of information up front. The XML export will provide us with a way to recover the current state of all existing records in your target tables. ServiceNow's XML exports are very robust and I can't stress the importance of this step. I once recovered an accidentally overwritten sys_user table from an XML snapshot, passwords and all.

### Add a Tag

In addition to restoring existing records, we also want to delete any newly imported records. I've found that an easy way to identify them is to create a new Tag (label) record. To accomplish this, you can navigate to **System Definition > Tags** and create a new Tag record. Then, create a Transform Script like the following:

**Transform Script**
**When:** onBefore
**Order:** 100
**Script:**
```js
(function runTransformScript(source, map, log, target /*undefined onStart*/ ) {
  /*
    Change to the sys_id of your Tag record.
    This will add the tag to newly created records
  */
  var tagSysId = '2e4144a113fba300630d5d422244b0aa';

  if (action == 'insert') {
  	var gr = new GlideRecord('label_entry');
  	gr.initialize();
  	gr.table = target.getTableName() + '';
  	gr.label = tagSysId;
  	gr.table_key = target.sys_id + '';
  	gr.title = target.getDisplayValue();
  	gr.insert();
  }

})(source, map, log, target);
```

Now you have an easy way to identify all the records created by the import that doesn't involve magical date/time stamps and hoping no one else created records at the same time.

### Choice Action Reject

Lastly, we need to change all **Choice Actions** to **reject** or **ignore**. I personally prefer **reject** because then I get a Skipped count to indicate issues. This step prevents the Transform Map from generating incidental records which will not get tagged by the script above. You may find that you can adjust the above script to tag Choice creation as well but I haven't taken it that far yet.

## Recovery Steps

With those 3 preparation steps we can ensure:

1. All existing records can be restored via XML import
2. All new records can be deleted via script

## Delete New Records

To delete the newly created records you can run the following background script:

```js
var tagSysId = '2e4144a113fba300630d5d422244b0aa';
var table = 'pm_project';

var gr = new GlideRecord(table);
gr.addEncodedQuery('sys_tags.' + tagSysId + '=' + tagSysId);
gr.deleteMultiple();
```

You can also convert this to an onStart Transform Script to have the records auto delete on reimport.

## Conclusion

Unfortunately, I've yet to find any built in rollbacks in ServiceNow for Import Sets. With a little foresight and preparation, though, we can take steps to ensure that we can recover from any import mishaps. As always, trying things out in Dev and Test should always be your first line of defense. But it's always nice to know you can setup a fallback plan. I, for one, like to think I can get out of trouble faster than I got into it.

And if you've got a better way, I'd love to know!
