-- One-time content load (no schema change): the last 17 Software Tips
-- (14 Windows, 3 phone), bringing the total to 100.
-- Fixed ids + ON CONFLICT DO NOTHING: added once, admin edits never overwritten.

INSERT INTO "RepairGuide" ("id", "category", "title", "brand", "modelName", "videoUrl", "thumbnail", "content", "toolsUsed", "createdAt") VALUES
('software-tip-usb-write-protected', 'SOFTWARE', 'Format a USB Drive or SD Card (and Fix "Write Protected")', 'Windows', 'Windows 10 and 11', NULL, '',
$tip$Formatting erases everything on the drive.

1. SD cards in an adapter: check the small lock switch on the side is pushed up (unlocked).
2. Format: open File Explorer, right-click the drive, then Format. Choose exFAT for drives bigger than 32 GB (works on Windows, Mac and most TVs), or FAT32 for small drives and older devices. Click Start.
3. "The disk is write-protected": open Command Prompt as administrator and run diskpart, then:
list disk
select disk 2 (use the number of your USB drive, check the size carefully)
attributes disk clear readonly
exit
4. Still write-protected or showing 0 bytes? The drive is usually failing. Copy off what you can and replace it.

Be very careful to select the right disk in diskpart. Picking the wrong one can erase the PC's drive.$tip$,
ARRAY['File Explorer', 'DiskPart'], now() - interval '80 minutes'),

('software-tip-extend-c-drive', 'SOFTWARE', 'Make the C: Drive Bigger', 'Windows', 'Windows 10 and 11', NULL, '',
$tip$Back up first. Changing partitions can lose data if something goes wrong.

1. Right-click Start, then Disk Management.
2. Windows can only extend C: into free (unallocated) space directly to its right.
3. If D: is right after C: and you can empty it: copy D:'s files elsewhere, right-click D:, Delete Volume, then right-click C:, Extend Volume, and follow the steps.
4. "Extend Volume" greyed out? A recovery partition is usually in the way. Moving it needs a partition tool, so it's best done by a technician.
5. Easier option: move big folders (videos, downloads, games) to D: or an external drive, and run Disk Cleanup (see our disk space tip).$tip$,
ARRAY['Disk Management'], now() - interval '79 minutes'),

('software-tip-boot-device-not-found', 'SOFTWARE', 'Fix "Boot Device Not Found" or "No Bootable Device"', 'Windows', 'All PCs', NULL, '',
$tip$1. Remove USB drives, SD cards and DVDs, then restart.
2. Open the BIOS (see our BIOS keys tip) and check the drive is detected.
3. Drive detected: set Windows Boot Manager (or the drive) first in the boot order. Make sure boot mode is UEFI for Windows installed in UEFI (most PCs from 2015 onwards).
4. Drive not detected at all: on desktops, check the drive's cables. On laptops, the drive may have come loose or failed.
5. Drive detected but still no boot: boot from a Windows USB and choose Repair your computer, then Troubleshoot, then Startup Repair.
6. A failed drive needs replacing. We can try to recover the files and install an SSD.$tip$,
ARRAY['BIOS', 'Windows bootable USB'], now() - interval '78 minutes'),

('software-tip-recover-deleted-files-windows', 'SOFTWARE', 'Recover Deleted Files on Windows', 'Windows', 'Windows 10 and 11', NULL, '',
$tip$Stop using the PC as much as possible. New files can overwrite what you're trying to recover.

1. Recycle Bin: open it, right-click the file and choose Restore.
2. OneDrive: deleted files stay in the OneDrive Recycle bin at onedrive.live.com for about 30 days.
3. Previous versions: right-click the folder that held the file, then Properties, then Previous Versions (works if File History or restore points were on).
4. File History backup: Control Panel, then File History, then Restore personal files.
5. Microsoft's free "Windows File Recovery" tool from the Microsoft Store can find deleted files on many drives. It's a command-line tool, so follow its instructions carefully.

Files deleted from an SSD a while ago are usually gone. Back up regularly.$tip$,
ARRAY['Recycle Bin', 'OneDrive', 'Windows File Recovery'], now() - interval '77 minutes'),

('software-tip-ransomware-protection', 'SOFTWARE', 'Protect a PC from Ransomware', 'Windows', 'Windows 10 and 11', NULL, '',
$tip$Ransomware locks your files and demands payment. Prevention is the only reliable fix.

1. Keep backups offline: copy important files to an external drive and unplug it afterwards.
2. Turn on Controlled folder access: Windows Security, then Virus and threat protection, then Ransomware protection. It blocks unknown programs from changing your Documents, Pictures and Desktop.
3. Keep Windows and all programs updated.
4. Don't open attachments or links in unexpected emails or WhatsApp messages, even from people you know.
5. Avoid cracked software and "free" activators. They are a common way ransomware gets in.
6. Use a standard account for daily use, not an administrator account.$tip$,
ARRAY['Windows Security', 'External drive'], now() - interval '76 minutes'),

('software-tip-laptop-overheating', 'SOFTWARE', 'Fix a Laptop That Overheats or Shuts Down', 'Windows', 'Windows laptops', NULL, '',
$tip$1. Use it on a hard, flat surface. Beds and laps block the air vents.
2. Clean the vents with short bursts of compressed air (hold the fan still with a toothpick so it doesn't over-spin).
3. Check Task Manager for programs using a lot of CPU when the laptop should be idle.
4. Use the Balanced power mode: Settings, then System, then Power and battery.
5. Update the BIOS and drivers from the manufacturer's site. Updates often improve fan control.
6. Still hot, loud or shutting down? The fan needs cleaning inside and the thermal paste replacing. We do this as a service.$tip$,
ARRAY['Compressed air', 'Task Manager'], now() - interval '75 minutes'),

('software-tip-check-pc-specs', 'SOFTWARE', 'Find a PC''s Specs and Windows Version', 'Windows', 'Windows 10 and 11', NULL, '',
$tip$1. Processor, RAM and Windows edition: Settings, then System, then About.
2. Exact Windows version: press Windows key and R, type winver and press Enter.
3. Graphics card: open Task Manager, then Performance, then GPU. Or press Windows key and R and type dxdiag.
4. Storage type and size: Task Manager, then Performance, then Disk (shows SSD or HDD).
5. Laptop model and serial number: the sticker underneath, or Command Prompt: wmic bios get serialnumber (older Windows) or in PowerShell: Get-CimInstance Win32_BIOS | Select-Object SerialNumber

Send us these details when asking about upgrades or parts.$tip$,
ARRAY['Settings', 'Task Manager', 'dxdiag'], now() - interval '74 minutes'),

('software-tip-windows-shortcuts', 'SOFTWARE', 'Windows Keyboard Shortcuts Every Technician Should Know', 'Windows', 'Windows 10 and 11', NULL, '',
$tip$Windows key + E: File Explorer
Windows key + I: Settings
Windows key + X: quick menu (Device Manager, Disk Management, Terminal)
Windows key + R: Run box
Windows key + L: lock the PC
Windows key + D: show the desktop
Windows key + V: clipboard history
Windows key + Shift + S: screenshot of part of the screen
Windows key + P: switch display (projector or second screen)
Ctrl + Shift + Esc: Task Manager
Alt + Tab: switch between open windows
Ctrl + Shift + T: reopen a closed browser tab
Windows key + Ctrl + Shift + B: restart the graphics driver (fixes a black or frozen screen)$tip$,
ARRAY['Keyboard'], now() - interval '73 minutes'),

('software-tip-windows-hello', 'SOFTWARE', 'Set Up a PIN, Fingerprint or Face Sign-in', 'Windows', 'Windows 10 and 11', NULL, '',
$tip$1. Settings, then Accounts, then Sign-in options.
2. PIN (Windows Hello): click Set up and choose a PIN. It's faster than a password and only works on this PC.
3. Fingerprint or Face: available if the laptop has a fingerprint reader or a Windows Hello camera. Click Set up and follow the steps.
4. Fingerprint option missing? Install the fingerprint driver from the laptop maker's support site.
5. Forgot the PIN? On the sign-in screen choose "I forgot my PIN" and confirm with your Microsoft account password.$tip$,
ARRAY['Windows Settings'], now() - interval '72 minutes'),

('software-tip-fast-startup', 'SOFTWARE', 'Turn Off Fast Startup to Fix Odd Problems', 'Windows', 'Windows 10 and 11', NULL, '',
$tip$Fast Startup makes "Shut down" more like hibernation. It can cause problems that only go away after a Restart: updates not finishing, devices not working, or other operating systems not starting.

1. Quick test: use Restart instead of Shut down. Restart always does a full start.
2. To turn it off: Control Panel, then Power Options, then "Choose what the power buttons do", then "Change settings that are currently unavailable".
3. Untick "Turn on fast startup" and click Save changes.

The PC may start a few seconds slower, especially with an old hard drive.$tip$,
ARRAY['Power Options'], now() - interval '71 minutes'),

('software-tip-new-laptop-setup', 'SOFTWARE', 'Set Up a New Laptop Properly', 'Windows', 'Windows 10 and 11', NULL, '',
$tip$1. Connect to Wi-Fi and sign in with a Microsoft account (it backs up your settings and gives you OneDrive).
2. Run Windows Update until nothing is left, restarting as needed.
3. Install the manufacturer's support app (HP Support Assistant, Lenovo Vantage, MyASUS, Dell SupportAssist) for driver and BIOS updates.
4. Remove trial programs you don't want, such as trial antivirus. Microsoft Defender is built in and is enough for most people.
5. Set up a PIN or fingerprint (see our Windows Hello tip).
6. Turn on backup (see our file backup tip) and create a restore point.
7. Register the warranty on the manufacturer's site with the serial number.$tip$,
ARRAY['Windows Update', 'Manufacturer app'], now() - interval '70 minutes'),

('software-tip-wifi-adapter-missing', 'SOFTWARE', 'Wi-Fi Option Missing on a Laptop', 'Windows', 'Windows laptops', NULL, '',
$tip$1. Turn off Airplane mode and press the laptop's Wi-Fi key (often Fn plus a key with a signal or plane icon).
2. Check Device Manager, then Network adapters. Look for a Wi-Fi or Wireless adapter (Intel, Realtek, MediaTek, Qualcomm).
3. Adapter missing or showing a warning: right-click, Uninstall device, then restart.
4. Install the Wi-Fi driver from the laptop maker's site. Use your phone's USB tethering for internet in the meantime (see our hotspot tip).
5. Network reset: Settings, then Network and internet, then Advanced network settings, then Network reset.
6. Adapter never appears even after a driver install? The Wi-Fi card may be faulty or disconnected inside. A USB Wi-Fi dongle is a quick fix.$tip$,
ARRAY['Device Manager', 'USB tethering'], now() - interval '69 minutes'),

('software-tip-microsoft-store-fix', 'SOFTWARE', 'Fix Microsoft Store and Built-in Apps Not Opening', 'Windows', 'Windows 10 and 11', NULL, '',
$tip$1. Check the date, time and time zone are set automatically: Settings, then Time and language.
2. Reset the Store cache: press Windows key and R, type wsreset.exe and press Enter. A blank window opens, then the Store opens.
3. Repair or reset an app: Settings, then Apps, then Installed apps, the three dots next to the app, then Advanced options, then Repair (keeps data) or Reset.
4. Sign out of the Store and sign back in.
5. Run Windows Update.
6. Still broken? Run sfc /scannow and DISM /Online /Cleanup-Image /RestoreHealth in Command Prompt as administrator.$tip$,
ARRAY['wsreset', 'Windows Settings'], now() - interval '68 minutes'),

('software-tip-slow-browser', 'SOFTWARE', 'Speed Up a Slow Browser', 'Windows', 'Chrome and Edge', NULL, '',
$tip$1. Close tabs you aren't using. Every tab uses memory.
2. Remove extensions you don't need (chrome://extensions or edge://extensions).
3. Clear browsing data: press Ctrl + Shift + Delete, choose "All time", and tick cached images and files. Ticking cookies signs you out of websites.
4. Update the browser: open the menu, then Help, then About.
5. Turn on Memory Saver (Chrome) or Sleeping tabs (Edge) in the Performance settings.
6. Still slow everywhere? Check for adware (see our browser pop-ups tip) and the PC itself (see our slow PC tip).$tip$,
ARRAY['Chrome', 'Edge'], now() - interval '67 minutes'),

('software-tip-phone-camera-not-working', 'SOFTWARE', 'Phone Camera Not Working or Black Screen', '', '', NULL, '',
$tip$1. Restart the phone.
2. Clear the camera app's cache: Settings, then Apps, then Camera, then Storage, then Clear cache.
3. Close other apps that may use the camera (video calls, flashlight, QR scanners).
4. Check permissions: Settings, then Apps, then Camera, then Permissions, and allow the camera.
5. Test in Safe Mode. If it works there, a recently installed app is the cause.
6. Try a different camera app (for example Google Meet or WhatsApp). If none work, the camera module or its connector likely needs replacing after a drop.$tip$,
ARRAY['Android Settings', 'Safe Mode'], now() - interval '66 minutes'),

('software-tip-phone-gps-location', 'SOFTWARE', 'Fix GPS and Location Problems', '', '', NULL, '',
$tip$1. Turn Location on and set it to high accuracy: Settings, then Location, then Location services, then Google Location Accuracy (on).
2. Go outside or near a window. GPS works poorly indoors.
3. Calibrate the compass: in Google Maps, tap the blue dot, then Calibrate, and follow the steps.
4. Clear Google Maps cache: Settings, then Apps, then Maps, then Storage, then Clear cache.
5. Allow location for the app: Settings, then Apps, choose the app, then Permissions, then Location.
6. Turn off battery saver, which can limit GPS.
7. Update Google Play services and Maps.$tip$,
ARRAY['Android Settings', 'Google Maps'], now() - interval '65 minutes'),

('software-tip-calls-dropping-volte', 'SOFTWARE', 'Fix Dropped Calls and Turn On 4G (VoLTE) Calling', '', '', NULL, '',
$tip$1. Restart the phone and check the signal bars in the area where calls drop.
2. Network mode: Settings, then Mobile network (or Connections), then Network mode, and choose the highest auto option (5G/4G/3G/2G auto).
3. Turn on VoLTE or "4G calling" in the same menu if your network supports it. Calls are clearer and your data keeps working during calls.
4. Wi-Fi calling: turn it on if your network offers it, for calls indoors with weak signal.
5. Reinsert or replace an old SIM card (see our SIM tip).
6. Calls drop only on speakerphone or only in one position? It can be a loose antenna or a bent frame after a drop. Bring it in for a check.$tip$,
ARRAY['Android Settings'], now() - interval '64 minutes')
ON CONFLICT ("id") DO NOTHING;
