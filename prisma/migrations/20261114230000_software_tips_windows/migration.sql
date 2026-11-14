-- One-time content load (no schema change): 20 Windows Software Tips.
-- Fixed ids + ON CONFLICT DO NOTHING: added once, admin edits never overwritten.

INSERT INTO "RepairGuide" ("id", "category", "title", "brand", "modelName", "videoUrl", "thumbnail", "content", "toolsUsed", "createdAt") VALUES
('software-tip-windows-update-stuck', 'SOFTWARE', 'Fix Windows Update Stuck or Failing', 'Windows', 'Windows 10 and 11', NULL, '',
$tip$1. Restart the PC and try again. Many updates need a restart first.
2. Free up at least 20 GB on the C: drive.
3. Run the troubleshooter: Settings, then System, then Troubleshoot, then Other troubleshooters, then Windows Update.
4. Reset the update files: open Command Prompt as administrator and run these one by one:
net stop wuauserv
net stop bits
ren C:\Windows\SoftwareDistribution SoftwareDistribution.old
net start bits
net start wuauserv
Then check for updates again.
5. Repair system files: sfc /scannow, then DISM /Online /Cleanup-Image /RestoreHealth.
6. Still failing? Note the error code (e.g. 0x80070002) and search it on support.microsoft.com, or bring the PC in.$tip$,
ARRAY['Windows Update', 'Command Prompt'], now() - interval '60 minutes'),

('software-tip-windows-no-internet', 'SOFTWARE', 'Fix No Internet on a Windows PC', 'Windows', 'Windows 10 and 11', NULL, '',
$tip$1. Check other devices on the same Wi-Fi work. If not, restart the router.
2. Turn Airplane mode off, and check the laptop's Wi-Fi key (often Fn plus a key with a signal icon).
3. Forget the Wi-Fi network and connect again with the password.
4. Run the network troubleshooter: Settings, then System, then Troubleshoot, then Other troubleshooters, then Network and Internet.
5. Reset the connection: open Command Prompt as administrator and run:
ipconfig /flushdns
netsh winsock reset
netsh int ip reset
Then restart the PC.
6. Network reset: Settings, then Network and internet, then Advanced network settings, then Network reset. This reinstalls the network adapters (save Wi-Fi passwords first).
7. Wi-Fi missing completely? See our tip on a missing Wi-Fi adapter.$tip$,
ARRAY['Windows Settings', 'Command Prompt'], now() - interval '59 minutes'),

('software-tip-windows-no-sound', 'SOFTWARE', 'No Sound on a Windows PC', 'Windows', 'Windows 10 and 11', NULL, '',
$tip$1. Check the volume icon in the taskbar isn't muted, and the app's own volume is up.
2. Choose the right output: click the volume icon, then the arrow next to the slider, and pick the speakers or headphones you want.
3. Unplug and replug headphones or HDMI. A TV or monitor connected by HDMI often takes the sound.
4. Run the audio troubleshooter: Settings, then System, then Troubleshoot, then Other troubleshooters, then Audio.
5. Device Manager: under "Sound, video and game controllers", right-click the audio device, then Uninstall device, and restart. Windows reinstalls it.
6. Install the audio driver from the laptop or motherboard manufacturer's support site.$tip$,
ARRAY['Windows Settings', 'Device Manager'], now() - interval '58 minutes'),

('software-tip-windows-blue-screen', 'SOFTWARE', 'Fix Blue Screen Errors (BSOD)', 'Windows', 'Windows 10 and 11', NULL, '',
$tip$1. Write down the stop code shown on the blue screen (e.g. CRITICAL_PROCESS_DIED or IRQL_NOT_LESS_OR_EQUAL).
2. Think about what changed: a new driver, update, program or hardware is the usual cause. Undo it.
3. Update Windows and drivers, especially graphics, chipset and Wi-Fi.
4. Repair system files: Command Prompt as administrator, then sfc /scannow, then DISM /Online /Cleanup-Image /RestoreHealth.
5. Test the RAM (see our memory test tip) and the drive (see our drive health tip). Faulty RAM and failing drives cause many blue screens.
6. Blue screen before Windows even starts? Use Startup Repair, System Restore or Safe Mode (see our "PC won't start" tip).
7. Overheating can also cause it. Clean the fans and vents.$tip$,
ARRAY['Command Prompt', 'Windows Memory Diagnostic'], now() - interval '57 minutes'),

('software-tip-windows-defender-offline', 'SOFTWARE', 'Remove Stubborn Viruses with a Defender Offline Scan', 'Windows', 'Windows 10 and 11', NULL, '',
$tip$Some viruses hide while Windows is running. An offline scan restarts the PC and scans before Windows loads.

1. Save your work and close all programs.
2. Open Windows Security, then Virus and threat protection, then Scan options.
3. Choose "Microsoft Defender Antivirus (offline scan)" and click Scan now.
4. The PC restarts and scans for about 15 minutes, then starts Windows again.
5. Check the results: Windows Security, then Virus and threat protection, then Protection history.

Then run a normal Full scan, remove programs you don't recognise, and change important passwords from a clean device.$tip$,
ARRAY['Windows Security'], now() - interval '56 minutes'),

('software-tip-windows-restore-point', 'SOFTWARE', 'Create a Restore Point Before Big Changes', 'Windows', 'Windows 10 and 11', NULL, '',
$tip$A restore point lets you undo driver, update and program changes without losing your files.

1. Search Start for "Create a restore point" and open it.
2. Select the C: drive. If Protection is Off, click Configure, choose "Turn on system protection", set about 5 to 10 percent of disk space, and click OK.
3. Click Create, give it a name like "Before driver update", and click Create.
4. To go back later: open the same window, click System Restore, and choose the restore point.

System Restore doesn't back up personal files. Keep a separate backup of documents and photos.$tip$,
ARRAY['System Protection'], now() - interval '55 minutes'),

('software-tip-windows-backup-files', 'SOFTWARE', 'Back Up Files on a Windows PC', 'Windows', 'Windows 10 and 11', NULL, '',
$tip$1. OneDrive: sign in to OneDrive and turn on folder backup for Desktop, Documents and Pictures (OneDrive settings, then Sync and backup, then Manage backup). The free plan includes 5 GB.
2. Windows 11 Windows Backup app: search "Windows Backup" to back up folders, apps and settings to your Microsoft account.
3. External drive with File History: plug in a USB drive, open Control Panel, then File History, select the drive and click Turn on. It keeps copies automatically while the drive is connected.
4. Simple copy: copy the Desktop, Documents, Pictures, Downloads and Videos folders to an external drive.

Keep at least one copy off the PC, so a dead drive or virus doesn't take everything.$tip$,
ARRAY['OneDrive', 'File History', 'External drive'], now() - interval '54 minutes'),

('software-tip-windows-reset-pc', 'SOFTWARE', 'Reset Windows and Keep Your Files', 'Windows', 'Windows 10 and 11', NULL, '',
$tip$Reset reinstalls Windows. It fixes most software problems without a USB drive.

1. Back up important files anyway, just in case.
2. Settings, then System, then Recovery, then "Reset PC" (Windows 10: Update and Security, then Recovery, then Get started).
3. Choose "Keep my files" to keep documents and photos. Installed programs are removed, so note which ones you need.
4. Choose "Cloud download" (downloads fresh Windows, needs good internet) or "Local reinstall".
5. Follow the steps and let it finish. It can take an hour.
6. Afterwards, run Windows Update and reinstall your programs.

Selling the PC? Choose "Remove everything" and "Clean data" instead.$tip$,
ARRAY['Windows Recovery'], now() - interval '53 minutes'),

('software-tip-windows-memory-test', 'SOFTWARE', 'Test a PC''s RAM for Errors', 'Windows', 'Windows 10 and 11', NULL, '',
$tip$Faulty RAM causes blue screens, freezing and random restarts.

1. Save your work.
2. Press Windows key and R, type mdsched.exe and press Enter.
3. Choose "Restart now and check for problems".
4. The test runs before Windows starts (about 10 to 20 minutes). Press F1 during the test to choose the Extended test for a more thorough check.
5. After Windows starts, the result appears as a notification. If you miss it, open Event Viewer, then Windows Logs, then System, and look for MemoryDiagnostics-Results.

Errors found? Try one RAM stick at a time to find the faulty one, or bring it in for a replacement.$tip$,
ARRAY['Windows Memory Diagnostic'], now() - interval '52 minutes'),

('software-tip-laptop-battery-report', 'SOFTWARE', 'Check a Laptop''s Battery Health', 'Windows', 'Windows laptops', NULL, '',
$tip$1. Open Command Prompt as administrator.
2. Run: powercfg /batteryreport
3. It saves battery-report.html and shows the file location. Open it in a browser.
4. Compare "Design capacity" with "Full charge capacity". If full charge is below about 60 percent of design, the battery is worn.
5. "Battery usage" and "Capacity history" show how it changed over time.

Laptop plugged in but not charging?
Try a different socket and the original charger, check the charger's light, and update the BIOS from the manufacturer's site. Some laptops have a battery care setting that stops charging at 60 or 80 percent: check the manufacturer's app (Lenovo Vantage, Dell Power Manager, MyASUS).$tip$,
ARRAY['Command Prompt', 'Manufacturer app'], now() - interval '51 minutes'),

('software-tip-printer-not-printing', 'SOFTWARE', 'Fix a Printer That Won''t Print', 'Windows', 'Windows 10 and 11', NULL, '',
$tip$1. Check the printer is on, has paper and ink, and shows no error light.
2. Make sure it's the default printer: Settings, then Bluetooth and devices, then Printers and scanners.
3. Clear stuck jobs: open the printer, then "Open print queue", and cancel all documents.
4. Restart the print service: press Windows key and R, type services.msc, find "Print Spooler", right-click and choose Restart.
5. Still stuck? Stop Print Spooler, delete the files in C:\Windows\System32\spool\PRINTERS, then start Print Spooler again.
6. Remove the printer, restart, and add it again. Install the latest driver from the printer maker's site (HP, Canon, Epson).
7. Wi-Fi printers: make sure the PC and printer are on the same network.$tip$,
ARRAY['Services', 'Printer driver'], now() - interval '50 minutes'),

('software-tip-laptop-keyboard-touchpad', 'SOFTWARE', 'Laptop Keyboard or Touchpad Not Working', 'Windows', 'Windows laptops', NULL, '',
$tip$1. Restart the laptop.
2. Touchpad: many laptops have a touchpad on/off key (Fn plus a key with a touchpad icon). Also check Settings, then Bluetooth and devices, then Touchpad.
3. Plug in a USB mouse or keyboard. If they work, the problem is the laptop's own part or its driver.
4. Device Manager: under Keyboards or "Mice and other pointing devices", right-click the device, Uninstall device, then restart.
5. Install the touchpad and chipset drivers from the manufacturer's support site.
6. Some keys type wrong characters? Check the keyboard layout in Settings, then Time and language, then Language and region.
7. Liquid spill? Switch it off immediately and bring it in. Don't turn it on to test it.$tip$,
ARRAY['Device Manager', 'USB mouse'], now() - interval '49 minutes'),

('software-tip-screen-flickering', 'SOFTWARE', 'Fix a Flickering Screen on Windows', 'Windows', 'Windows 10 and 11', NULL, '',
$tip$1. Open Task Manager (Ctrl + Shift + Esc). If Task Manager flickers too, it's usually the display driver. If it doesn't, an app is causing it.
2. Display driver: update it from Windows Update or the graphics maker (Intel, AMD, NVIDIA), or roll it back in Device Manager, then Display adapters, then Properties, then Driver.
3. App problem: update or uninstall recently installed apps.
4. Set the correct refresh rate: Settings, then System, then Display, then Advanced display.
5. External monitor: try another cable or port.
6. Flickering that changes when you move the laptop screen usually means the screen cable or panel is faulty. That's a hardware repair.$tip$,
ARRAY['Task Manager', 'Device Manager'], now() - interval '48 minutes'),

('software-tip-bios-boot-keys', 'SOFTWARE', 'BIOS and Boot Menu Keys by Brand', 'Windows', 'All PCs', NULL, '',
$tip$Press the key repeatedly right after switching the PC on.

Dell: BIOS F2, boot menu F12
HP: press Esc for the startup menu, then F10 for BIOS or F9 for boot menu
Lenovo laptops: BIOS F2 (or Fn and F2), boot menu F12 (or Fn and F12). Many have a small Novo button with an arrow icon.
Lenovo desktops: BIOS F1, boot menu F12
Acer: BIOS F2, boot menu F12 (enable it in BIOS first on some models)
ASUS: BIOS F2 or Del, boot menu Esc or F8
MSI and most desktop motherboards: BIOS Del, boot menu F11

Can't catch it? From Windows: Settings, then System, then Recovery, then Advanced startup, then Restart now, then Troubleshoot, then Advanced options, then UEFI Firmware Settings.$tip$,
ARRAY['Keyboard'], now() - interval '47 minutes'),

('software-tip-windows11-tpm-secure-boot', 'SOFTWARE', 'Check if a PC Can Run Windows 11 (TPM and Secure Boot)', 'Windows', 'Windows 10 PCs', NULL, '',
$tip$1. Install and run Microsoft's PC Health Check app. It tells you exactly what's missing.
2. TPM: press Windows key and R, type tpm.msc. "TPM is ready for use" with Specification Version 2.0 is what you need.
3. TPM off? Enable it in the BIOS (see our BIOS keys tip). It's called Intel PTT on Intel PCs and AMD fTPM on AMD PCs.
4. Secure Boot: press Windows key and R, type msinfo32, and check "Secure Boot State". Turn it on in the BIOS if it says Off. The drive must use GPT and the BIOS must be in UEFI mode.
5. Processor: Windows 11 officially needs roughly Intel 8th generation or AMD Ryzen 2000 series or newer.

If the PC can't run Windows 11, see our Windows 10 end of support tip.$tip$,
ARRAY['PC Health Check', 'BIOS'], now() - interval '46 minutes'),

('software-tip-windows10-end-of-support', 'SOFTWARE', 'Windows 10 Support Has Ended: What to Do', 'Windows', 'Windows 10', NULL, '',
$tip$Microsoft stopped free security updates for Windows 10 on October 14, 2025. The PC still works, but it gets riskier over time.

1. Check if the PC can run Windows 11 (see our TPM and Secure Boot tip). If it can, the upgrade is free: Settings, then Update and Security, then Windows Update.
2. Can't upgrade yet? Microsoft offers Extended Security Updates (ESU) for Windows 10 for a limited time. Check Windows Update for the enrolment option.
3. Keep Windows 10 safer meanwhile: keep your browser and antivirus updated, and avoid unknown downloads.
4. Older PCs: upgrading to an SSD and more RAM makes many of them fast enough for years more. Ask us what fits your PC.$tip$,
ARRAY['Windows Update', 'PC Health Check'], now() - interval '45 minutes'),

('software-tip-quick-assist', 'SOFTWARE', 'Help Someone Remotely with Quick Assist', 'Windows', 'Windows 10 and 11', NULL, '',
$tip$Quick Assist is built into Windows and lets you see and control another PC to help fix it.

1. Both people open Quick Assist (search the Start menu).
2. The helper chooses "Help someone", signs in with a Microsoft account, and reads out the security code.
3. The person getting help enters the code, then allows the helper to view or take control.
4. When done, either person can end the session.

Safety: only let people you know and trust connect. Scammers call pretending to be Microsoft, a bank or a network. Microsoft never calls you to fix your PC.$tip$,
ARRAY['Quick Assist', 'Microsoft Account'], now() - interval '44 minutes'),

('software-tip-install-office', 'SOFTWARE', 'Install Microsoft Office or Microsoft 365 the Right Way', 'Windows', 'Windows and Mac', NULL, '',
$tip$1. Go to office.com and sign in with the Microsoft account that bought Office or Microsoft 365. A product key from a retail card is redeemed at microsoft.com/setup.
2. Click "Install apps" and run the downloaded installer.
3. Open Word or Excel and sign in with the same account to activate.
4. Moving to a new PC: Microsoft 365 can be installed on several devices. One-time versions (Office 2021, 2024) can usually be moved after removing them from the old PC.
5. No licence? Office on the web at office.com is free to use in the browser.

Avoid "cracked" Office. It often contains malware and stops working after updates.$tip$,
ARRAY['Microsoft Account', 'office.com'], now() - interval '43 minutes'),

('software-tip-browser-hijack', 'SOFTWARE', 'Fix Browser Pop-ups, Fake Search Pages and Redirects', 'Windows', 'Windows 10 and 11', NULL, '',
$tip$1. Remove unknown extensions: in Chrome open chrome://extensions, in Edge open edge://extensions, and remove anything you don't recognise.
2. Block notification spam: Chrome, then Settings, then Privacy and security, then Site settings, then Notifications. Remove sites you don't recognise.
3. Reset the browser: Chrome, then Settings, then Reset settings, then "Restore settings to their original defaults". Edge has the same under Settings, then Reset settings.
4. Uninstall unknown programs: Settings, then Apps, then Installed apps, sorted by install date.
5. Run a Full scan in Windows Security.
6. Check the browser shortcut: right-click it, then Properties. The Target should end with chrome.exe or msedge.exe, with no web address after it.$tip$,
ARRAY['Chrome', 'Edge', 'Windows Security'], now() - interval '42 minutes'),

('software-tip-usb-not-recognized', 'SOFTWARE', 'Fix "USB Device Not Recognized" on Windows', 'Windows', 'Windows 10 and 11', NULL, '',
$tip$1. Try another USB port, preferably at the back of a desktop, and another cable.
2. Try the device on another PC to see if the device itself is faulty.
3. Device Manager: find the device with a yellow warning (often under "Universal Serial Bus controllers" or "Other devices"), right-click, Uninstall device, then unplug and plug it back in.
4. Power saving: in Device Manager, open each "USB Root Hub", then Power Management, and untick "Allow the computer to turn off this device".
5. Install the device's driver (phone drivers are covered in our USB drivers tip).
6. Restart the PC fully (Shift and Restart).$tip$,
ARRAY['Device Manager'], now() - interval '41 minutes')
ON CONFLICT ("id") DO NOTHING;
