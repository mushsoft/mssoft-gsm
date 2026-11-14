-- One-time content load (no schema change): 12 more Software Tips (8 for
-- Windows PCs, 4 for phones). Fixed ids + ON CONFLICT DO NOTHING, so each
-- tip is only added once and later admin edits are never overwritten.

-- The activation tip used wmic, which newer Windows 11 versions no longer
-- include. Swap in the PowerShell equivalent (exact-text replace, so a
-- version already edited in the admin is left alone).
UPDATE "RepairGuide"
SET "content" = replace(
      replace("content",
        'Open Command Prompt as administrator and run:
wmic path softwarelicensingservice get OA3xOriginalProductKey',
        'Open PowerShell as administrator and run:
(Get-CimInstance -ClassName SoftwareLicensingService).OA3xOriginalProductKey'),
      'Command Prompt', 'PowerShell'),
    "toolsUsed" = ARRAY['Windows Settings', 'Microsoft Account', 'PowerShell']
WHERE "id" = 'software-tip-windows-activation'
  AND "content" LIKE '%wmic path softwarelicensingservice%';

INSERT INTO "RepairGuide" ("id", "category", "title", "brand", "modelName", "videoUrl", "thumbnail", "content", "toolsUsed", "createdAt") VALUES
(
  'software-tip-windows-bootable-usb', 'SOFTWARE',
  'Make a Windows 10 or 11 Bootable USB', '', '', NULL, '',
  $tip$You need a USB flash drive of at least 8 GB. Everything on it will be erased.

Option 1: Microsoft's Media Creation Tool (easiest)
1. On a working PC, go to microsoft.com/software-download and choose Windows 11 or Windows 10.
2. Under "Create Windows installation media", download and run the tool.
3. Accept the terms, choose the language and edition, then "USB flash drive".
4. Pick your USB drive and wait until it says it's ready.

Option 2: Rufus with an official ISO
1. From the same Microsoft page, download the Windows ISO file.
2. Download Rufus from rufus.ie and open it.
3. Device: your USB drive. Boot selection: the ISO. Partition scheme: GPT for most PCs from 2015 onwards, MBR for very old ones.
4. Click Start and wait for "READY".

Only download Windows from microsoft.com. Copies from other sites can contain malware.$tip$,
  ARRAY['Media Creation Tool', 'Rufus', 'USB flash drive (8 GB+)'], now() - interval '12 minutes'
),
(
  'software-tip-windows-clean-install', 'SOFTWARE',
  'Clean Install Windows 10 or 11 Step by Step', '', '', NULL, '',
  $tip$A clean install fixes most stubborn Windows problems, viruses and slowness. It erases the drive you install to, so back up first.

1. Back up the user's files (Desktop, Documents, Pictures, Downloads) to an external drive or OneDrive.

2. Make a bootable USB (see our bootable USB tip).

3. Boot from the USB
Restart and press the boot menu key: Dell, Lenovo and Acer usually F12, HP Esc then F9, ASUS Esc or F8. Choose the USB drive.

4. Install
Choose the language, then "Install now". If you're asked for a product key and the PC already had genuine Windows, choose "I don't have a product key": it re-activates itself once online.

5. Pick the edition the PC had before (usually Home), then "Custom: Install Windows only".

6. Delete the old Windows partitions on the main drive only, select the "Unallocated space" and click Next. Be careful not to delete partitions on a second data drive.

7. Finish setup, connect to the internet, and run Windows Update until no more updates appear.

Windows 11 needs TPM 2.0 and Secure Boot enabled in the BIOS. Most PCs from 2018 onwards have them.$tip$,
  ARRAY['Windows bootable USB', 'External drive for backup'], now() - interval '11 minutes'
),
(
  'software-tip-windows-wont-boot', 'SOFTWARE',
  'Fix a Windows PC That Won''t Start', '', '', NULL, '',
  $tip$Try these before reinstalling Windows.

1. Open the recovery screen
If Windows fails to start twice in a row, it opens "Automatic Repair" on its own. You can force it by turning the PC off while the Windows logo shows, three times in a row.

2. Startup Repair
Choose Advanced options, then Troubleshoot, then Advanced options, then Startup Repair.

3. Uninstall the latest update
If it broke after an update: Troubleshoot, then Advanced options, then Uninstall Updates, then "Uninstall latest quality update".

4. System Restore
Troubleshoot, then Advanced options, then System Restore, and pick a restore point from before the problem. Personal files are kept.

5. Safe Mode
Troubleshoot, then Advanced options, then Startup Settings, then Restart, then press 4. If Windows starts in Safe Mode, remove recently installed programs or drivers.

6. Repair system files
From Safe Mode or a working Windows, open Command Prompt as administrator and run:
sfc /scannow
DISM /Online /Cleanup-Image /RestoreHealth
Then restart.

7. Still not starting?
Check the drive's health (see our drive health tip). A failing hard drive is a very common cause, and replacing it with an SSD fixes it.$tip$,
  ARRAY['Windows Recovery', 'Command Prompt'], now() - interval '10 minutes'
),
(
  'software-tip-windows-speed-up', 'SOFTWARE',
  'Speed Up a Slow Windows PC', '', '', NULL, '',
  $tip$1. Turn off startup apps
Press Ctrl + Shift + Esc to open Task Manager, open "Startup apps", and disable anything you don't need at startup.

2. Check what's using the PC
In Task Manager's Processes tab, sort by CPU, Memory and Disk. If Disk stays near 100 percent on an old hard drive, the drive is the bottleneck.

3. Scan for viruses
Open Windows Security, then Virus and threat protection, then Scan options, then Full scan.

4. Free up space (see our disk space tip). Keep at least 15 to 20 percent of the C: drive free.

5. Uninstall what you don't use
Settings, then Apps, then Installed apps. Remove toolbars, "PC cleaners" and trial antivirus programs.

6. Update Windows and drivers
Settings, then Windows Update, then Check for updates.

7. The biggest upgrade
Replacing an old hard drive with an SSD makes most PCs start in seconds instead of minutes. Upgrading from 4 GB to 8 GB of RAM also helps a lot. Ask us for a quote.$tip$,
  ARRAY['Task Manager', 'Windows Security', 'Windows Update'], now() - interval '9 minutes'
),
(
  'software-tip-windows-forgot-password', 'SOFTWARE',
  'Forgot Your Windows Password? Get Back In', '', '', NULL, '',
  $tip$Only use these steps on your own PC or with the owner's permission.

1. Microsoft account (sign-in uses an email)
On the sign-in screen, choose "I forgot my password", or on another device go to account.live.com/password/reset. Reset it, connect the PC to the internet, and sign in with the new password.

2. Local account with security questions
On Windows 10 and 11, enter a wrong password once, then choose "Reset password" and answer the security questions.

3. Another administrator account on the PC
Sign in with it, then go to Settings, then Accounts, then Other users (or Control Panel, then User Accounts) and set a new password for the locked account.

4. PIN not working?
Choose "Sign-in options" on the lock screen and use the password instead, then set a new PIN in Settings, then Accounts, then Sign-in options.

5. None of these work?
The last option is resetting or reinstalling Windows, which erases the PC. Bring it in and we can try to save the files first.$tip$,
  ARRAY['Microsoft Account', 'Windows Settings'], now() - interval '8 minutes'
),
(
  'software-tip-windows-drivers', 'SOFTWARE',
  'Install Missing Drivers After Reinstalling Windows', '', '', NULL, '',
  $tip$1. Windows Update first
Connect to the internet (use a phone's USB tethering if Wi-Fi isn't working yet), then go to Settings, then Windows Update, and install everything. Also check Advanced options, then Optional updates, then Driver updates.

2. Find what's still missing
Right-click Start, then Device Manager. Devices with a yellow warning sign still need drivers.

3. Use the manufacturer's support site
Find the serial number or model on the sticker under the laptop, then download drivers from the official site:
Dell: dell.com/support
HP: support.hp.com
Lenovo: pcsupport.lenovo.com
Acer, ASUS and others have similar support pages.
Install chipset first, then graphics, then Wi-Fi, audio and the rest, restarting when asked.

4. Avoid "driver updater" programs and driver packs from unknown sites. They often install the wrong drivers or bundle adware.$tip$,
  ARRAY['Windows Update', 'Device Manager'], now() - interval '7 minutes'
),
(
  'software-tip-windows-disk-space', 'SOFTWARE',
  'Free Up Disk Space on Windows', '', '', NULL, '',
  $tip$1. Temporary files
Settings, then System, then Storage, then Temporary files. Tick the items you don't need and click "Remove files". Don't tick Downloads unless the user has checked that folder.

2. Turn on Storage Sense
Settings, then System, then Storage, then Storage Sense. It clears temporary files and the Recycle Bin automatically.

3. Remove the old Windows copy after an upgrade
Search for "Disk Cleanup", choose "Clean up system files", and tick "Previous Windows installation(s)". Only do this if the PC is working well, because it removes the option to go back.

4. Find big files
Settings, then System, then Storage, then "Show more categories" shows what's taking the space. Move videos and photos to an external drive or OneDrive.

5. Uninstall big programs and games you no longer use (Settings, then Apps, then Installed apps, sorted by size).$tip$,
  ARRAY['Storage Settings', 'Disk Cleanup', 'Storage Sense'], now() - interval '6 minutes'
),
(
  'software-tip-windows-drive-health', 'SOFTWARE',
  'Check a Hard Drive or SSD for Problems', '', '', NULL, '',
  $tip$A failing drive causes freezing, very slow starts, "Automatic Repair" loops and lost files. Check it early.

1. Quick health check
Open PowerShell as administrator and run:
Get-PhysicalDisk | Select-Object FriendlyName, MediaType, HealthStatus
"Healthy" is good. "Warning" or "Unhealthy" means back up now and replace the drive.

2. Detailed check
Install CrystalDiskInfo (crystalmark.info). Blue "Good" is fine, yellow "Caution" means back up soon, red "Bad" means replace it now.

3. Check for file system errors
Open Command Prompt as administrator and run:
chkdsk C: /scan
If errors are found, run chkdsk C: /f and restart when asked.

4. Warning signs
Clicking or grinding noises, files that won't open, and constant 100 percent disk usage on an old hard drive all point to a failing drive.

Back up important files first. We can replace the drive with an SSD and move the user's files across.$tip$,
  ARRAY['PowerShell', 'CrystalDiskInfo', 'Command Prompt'], now() - interval '5 minutes'
),
(
  'software-tip-phone-transfer-data', 'SOFTWARE',
  'Move Everything to a New Phone', '', '', NULL, '',
  $tip$1. On the old phone
Back it up (see our backup tip): Google backup, Google Photos, and a WhatsApp chat backup.

2. Android to Android
Turn on the new phone and, during setup, choose "Copy apps and data" and follow the steps. Use the same Google account. You can connect the two phones with a USB cable or over Wi-Fi.

3. To a Samsung phone
Install Samsung Smart Switch on both phones (it's built into new Samsungs) and follow the steps over Wi-Fi or with a cable.

4. WhatsApp
On the new phone, install WhatsApp, verify the same number, and tap "Restore" when it finds the backup. Newer versions can also transfer directly: WhatsApp, then Settings, then Chats, then Transfer chats.

5. Before wiping the old phone, open the new one and check that contacts, photos and chats are all there. Then remove the Google account from the old phone before resetting it.$tip$,
  ARRAY['Google Backup', 'Samsung Smart Switch', 'WhatsApp'], now() - interval '4 minutes'
),
(
  'software-tip-phone-network-fix', 'SOFTWARE',
  'Fix Wi-Fi and Mobile Data Problems on Android', '', '', NULL, '',
  $tip$1. Quick fixes
Turn Airplane mode on and off. Restart the phone. Remove and reinsert the SIM card.

2. Mobile data
Make sure Mobile data is on and you have data on your bundle. Check that Data roaming is off when you're in Uganda.

3. Check the APN
Settings, then Mobile network (or Connections), then Access Point Names. If it's empty or wrong, choose "Reset to default", or add the APN your network provides (ask your network's customer care).

4. Wi-Fi keeps dropping or won't connect
Forget the network and connect again with the password. Restart the router too.

5. Reset network settings
Settings, then System, then Reset options, then "Reset Wi-Fi, mobile and Bluetooth". This clears saved Wi-Fi passwords and pairings, but no personal data.

6. Network still missing after flashing?
Dial *#06#. If the IMEI shows as blank or 0, the phone needs its network data restored. Bring it to us.$tip$,
  ARRAY['Android Settings'], now() - interval '3 minutes'
),
(
  'software-tip-phone-storage-full', 'SOFTWARE',
  'Free Up Storage on an Android Phone', '', '', NULL, '',
  $tip$A full phone gets slow, can't update and stops taking photos.

1. See what's using space
Settings, then Storage. Look at Apps, Images, Videos and "Other".

2. WhatsApp media is often the biggest
WhatsApp, then Settings, then Storage and data, then Manage storage. Delete large files and old videos from busy groups.

3. Photos and videos
Back them up with Google Photos, then use "Free up space" in Google Photos to remove the copies already backed up.

4. Clear app cache
Settings, then Apps, choose a big app (Facebook, TikTok, YouTube), then Storage, then Clear cache. Don't tap Clear data unless you want to reset that app.

5. Uninstall apps you don't use, and use "Lite" versions of social apps on smaller phones.

6. Move files to an SD card if the phone has a slot, or copy them to a PC.$tip$,
  ARRAY['Android Settings', 'Google Photos', 'WhatsApp'], now() - interval '2 minutes'
),
(
  'software-tip-phone-before-sale-repair', 'SOFTWARE',
  'Prepare a Phone Before Selling It or Sending It for Repair', '', '', NULL, '',
  $tip$1. Back up everything (see our backup tip).

2. For repair: you can keep your data, but set a simple PIN you're happy to share with the technician, or tell them the screen lock so they can test the phone after fixing it.

3. For selling or giving away
Remove your Google account first: Settings, then Accounts, then your Google account, then Remove account. On Samsung, also remove your Samsung account.
This stops the next owner being blocked by the FRP lock.

4. Factory reset
Settings, then System, then Reset options, then "Erase all data (factory reset)".

5. Remove your SIM card and SD card.

6. Keep the box and receipt: they show the phone was yours and make it easier to sell.$tip$,
  ARRAY['Android Settings'], now() - interval '1 minute'
)
ON CONFLICT ("id") DO NOTHING;
