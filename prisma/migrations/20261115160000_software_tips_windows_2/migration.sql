-- One-time content load (no schema change): 30 more Windows tips,
-- each with its own photo from public/tips (free Pexels photos).
-- Fixed ids + ON CONFLICT DO NOTHING: added once, admin edits never overwritten.

INSERT INTO "RepairGuide" ("id", "category", "title", "brand", "modelName", "videoUrl", "thumbnail", "content", "toolsUsed", "createdAt") VALUES
('software-tip-windows-clipboard-history', 'SOFTWARE', 'Clipboard History: Paste Things You Copied Earlier', 'Microsoft', 'Windows 10, Windows 11', NULL, '/tips/windows-clipboard-history.jpg',
$tip$1. Press the Windows key and V.
2. The first time, click Turn on.
3. From now on, everything you copy is saved in a list. Press Windows and V, then click an item to paste it.
4. Pin items you use often (addresses, account numbers) with the pin icon.
5. Windows 11: the same panel also has emojis, symbols and GIFs.
6. Clear the list: Settings, System, Clipboard, Clear.

Turn the list off on shared computers: Settings, System, Clipboard, Clipboard history.$tip$,
ARRAY['Windows key and V'], now() - interval '700 minutes'),

('software-tip-windows-onedrive', 'SOFTWARE', 'OneDrive on Windows: Stop It Filling Your Drive, or Turn It Off', 'Microsoft', 'Windows 10, Windows 11', NULL, '/tips/windows-onedrive.jpg',
$tip$OneDrive copies Desktop, Documents and Pictures to the cloud. The free plan is only 5 GB, so it often fills up and shows warnings.

1. Free space on the PC: right-click a folder in OneDrive, then "Free up space". Files stay online and download when opened.
2. Choose what's backed up: click the OneDrive cloud icon, gear, Settings, Sync and backup, Manage backup. Turn off folders you don't want.
3. When you stop backup, some files may stay online only. Open the OneDrive folder and copy them back to your PC first.
4. Pause syncing to save data: OneDrive icon, gear, Pause syncing.
5. Remove it: Settings, Apps, Installed apps, Microsoft OneDrive, Uninstall (after copying your files back).

Green tick = on the PC. Cloud icon = online only.$tip$,
ARRAY['OneDrive'], now() - interval '701 minutes'),

('software-tip-windows-storage-sense', 'SOFTWARE', 'Free Space Automatically with Storage Sense', 'Microsoft', 'Windows 10, Windows 11', NULL, '/tips/windows-storage-sense.jpg',
$tip$1. Open Settings, System, Storage.
2. Turn on Storage Sense. It deletes temporary files automatically.
3. Click Storage Sense to set it up: empty the Recycle Bin after 30 days, and clean files in Downloads you haven't opened for a while (careful with this one).
4. Click "Run Storage Sense now" for an immediate clean.
5. Windows 11: "Cleanup recommendations" lists large files, unused apps and synced files you can remove.

Leave Downloads cleaning off if you keep important files there.$tip$,
ARRAY['Storage Sense'], now() - interval '702 minutes'),

('software-tip-windows-startup-apps', 'SOFTWARE', 'Stop Programs Opening at Startup to Make Windows Start Faster', 'Microsoft', 'Windows 10, Windows 11', NULL, '/tips/windows-startup-apps.jpg',
$tip$1. Open Settings, Apps, Startup (Windows 11 and newer Windows 10).
2. Or press Ctrl, Shift and Esc to open Task Manager, then the Startup apps tab.
3. Look at the "Startup impact" column. Turn off apps with High impact that you don't need straight away: game launchers, chat apps, updaters, music apps.
4. Keep antivirus, touchpad, sound and graphics drivers on.
5. Restart and see the difference.

Turning an app off here doesn't uninstall it. You can still open it from the Start menu.$tip$,
ARRAY['Task Manager', 'Settings'], now() - interval '703 minutes'),

('software-tip-windows-sfc-dism', 'SOFTWARE', 'Repair Damaged Windows Files with SFC and DISM', 'Microsoft', 'Windows 10, Windows 11', NULL, '/tips/windows-sfc-dism.jpg',
$tip$Use this when Windows crashes, settings won't open or features stop working.

1. Right-click Start and open Terminal (Admin) or Command Prompt (Admin).
2. Run (stay connected to the internet):
DISM /Online /Cleanup-Image /RestoreHealth
3. Wait until it reaches 100%. It can look stuck at 20% or 62% for a while, that's normal.
4. Then run:
sfc /scannow
5. Restart the PC.

"Windows Resource Protection found corrupt files and successfully repaired them" is good. If it says it couldn't repair some, run both commands again, then consider a Reset (see our Reset tip).$tip$,
ARRAY['Terminal', 'SFC', 'DISM'], now() - interval '704 minutes'),

('software-tip-windows-chkdsk', 'SOFTWARE', 'Check a Drive for Errors with CHKDSK', 'Microsoft', 'Windows 10, Windows 11', NULL, '/tips/windows-chkdsk.jpg',
$tip$1. Back up important files first, especially if the drive is old or making noises.
2. Quick check: open File Explorer, right-click the drive, Properties, Tools, Check.
3. Command way: open Terminal (Admin) and run
chkdsk C: /scan
This checks without changes while Windows runs.
4. To fix errors on C:, run chkdsk C: /f, type Y, and restart. It runs before Windows starts.
5. For a USB drive or memory card that won't open properly: chkdsk E: /f (use its letter).

If CHKDSK finds bad sectors, the drive is failing. Check its health (see our drive health tip) and replace it.$tip$,
ARRAY['CHKDSK', 'Terminal'], now() - interval '705 minutes'),

('software-tip-windows-remote-desktop', 'SOFTWARE', 'Control Another Computer with Remote Desktop', 'Microsoft', 'Windows 10, Windows 11', NULL, '/tips/windows-remote-desktop.jpg',
$tip$1. On the computer you want to control: it must be Windows Pro (Home can only connect to others). Settings, System, Remote Desktop, turn on.
2. Note the PC name shown there, and use an account with a password.
3. On your computer: open "Remote Desktop Connection" (or the Windows App), type the PC name or IP address, and connect.
4. Sign in with that PC's account.
5. On the same office network this works directly. Over the internet it needs a VPN, so ask your IT person.

To help family on Windows Home, use Quick Assist instead (see our Quick Assist tip).$tip$,
ARRAY['Remote Desktop'], now() - interval '706 minutes'),

('software-tip-windows-share-folder', 'SOFTWARE', 'Share Files Between Computers on the Same Network', 'Microsoft', 'Windows 10, Windows 11', NULL, '/tips/windows-share-folder.jpg',
$tip$1. Both PCs on the same Wi-Fi or office network, set to Private: Settings, Network and internet, Wi-Fi (or Ethernet), the network, Private network.
2. Turn on sharing: Settings, Network and internet, Advanced network settings, Advanced sharing settings. Turn on Network discovery and File and printer sharing for Private.
3. Right-click the folder, Properties, Sharing, Share. Add the user (or Everyone) and choose Read or Read/Write.
4. On the other PC: open File Explorer and type \\PCNAME (or \\192.168.1.20) in the address bar.
5. Sign in with an account from the sharing PC if asked.

Small files? Nearby sharing is quicker (see our Nearby sharing tip). Never share folders on public Wi-Fi.$tip$,
ARRAY['File Explorer', 'Network settings'], now() - interval '707 minutes'),

('software-tip-windows-night-light', 'SOFTWARE', 'Night Light and Brightness on Windows', 'Microsoft', 'Windows 10, Windows 11', NULL, '/tips/windows-night-light.jpg',
$tip$1. Open Settings, System, Display.
2. Night light: turn on to make the screen warmer (less blue) in the evening. Click it to set the strength and a schedule (sunset to sunrise).
3. Brightness: use the slider here, or the sun keys on a laptop (often with Fn).
4. "Change brightness automatically" (on laptops with a light sensor) adjusts to the room.
5. Battery saver also lowers brightness to save power.

Brightness slider missing on a laptop? The display driver is usually missing. Install it from the laptop maker's website (see our drivers tip).$tip$,
ARRAY['Settings', 'Display'], now() - interval '708 minutes'),

('software-tip-windows-display-scaling', 'SOFTWARE', 'Text Too Small or Too Big on Windows? Fix Scale and Resolution', 'Microsoft', 'Windows 10, Windows 11', NULL, '/tips/windows-display-scaling.jpg',
$tip$1. Open Settings, System, Display.
2. Display resolution: choose the one marked "(Recommended)". The wrong resolution makes everything blurry or stretched.
3. Scale: 100%, 125% or 150% make text and icons bigger. Use the recommended value, then adjust to taste.
4. Only text bigger: Settings, Accessibility, Text size.
5. Websites only: press Ctrl and plus (or Ctrl and scroll) to zoom in the browser. Ctrl and 0 resets it.

Only low resolutions available, like 800 x 600? The graphics driver is missing. Install it from the PC maker's website.$tip$,
ARRAY['Settings', 'Display'], now() - interval '709 minutes'),

('software-tip-windows-mouse-touchpad', 'SOFTWARE', 'Adjust Mouse and Touchpad Settings on Windows', 'Microsoft', 'Windows 10, Windows 11', NULL, '/tips/windows-mouse-touchpad.jpg',
$tip$Open Settings, Bluetooth and devices, then Mouse or Touchpad.

Mouse: pointer speed, swap left and right buttons (for left-handed people), scroll speed.
Touchpad:
1. Tap to click and two-finger right-click.
2. Scroll direction (Down motion scrolls up or down).
3. Three and four finger gestures: switch apps, show desktop.
4. Turn off the touchpad when a mouse is connected.

Touchpad not working at all? Look for a touchpad key (often F6, F7 or F9 with Fn) that turns it off. Still dead? Install the touchpad driver from the laptop maker's website (see our keyboard and touchpad tip).$tip$,
ARRAY['Settings', 'Bluetooth and devices'], now() - interval '710 minutes'),

('software-tip-windows-notifications', 'SOFTWARE', 'Turn Off Distracting Notifications on Windows', 'Microsoft', 'Windows 10, Windows 11', NULL, '/tips/windows-notifications.jpg',
$tip$1. Open Settings, System, Notifications.
2. Turn notifications off per app in the list, for example games, store apps and browsers.
3. Do not disturb: turn on for silence, or set a schedule (for example 22:00 to 07:00) under "Turn on do not disturb automatically".
4. Windows 11 Focus: start a focus session from the Clock app or the notification panel.
5. Website pop-ups in the corner come from sites you allowed. In Chrome or Edge: Settings, Site permissions (or Privacy), Notifications, and remove them.
6. Turn off tips: at the bottom, untick "Get tips and suggestions when using Windows".$tip$,
ARRAY['Settings', 'Notifications'], now() - interval '711 minutes'),

('software-tip-windows-microsoft-vs-local-account', 'SOFTWARE', 'Microsoft Account or Local Account: Which to Use on Windows', 'Microsoft', 'Windows 10, Windows 11', NULL, '/tips/windows-microsoft-vs-local-account.jpg',
$tip$Microsoft account (email sign-in):
Good: forgotten password can be reset online, BitLocker recovery key saved online, OneDrive and Store included, settings sync.
Downside: needs internet at setup. You must remember the email and password.

Local account (name and password only on the PC):
Good: private, works fully offline.
Downside: forget the password and you may lose access, unless you set security questions or a reset disk.

Switch: Settings, Accounts, Your info, then "Sign in with a local account instead" or "Sign in with a Microsoft account instead".

Whatever you choose, write the account email and password somewhere safe. Most customers we see locked out simply forgot which email they used.$tip$,
ARRAY['Settings', 'Accounts'], now() - interval '712 minutes'),

('software-tip-windows-file-history', 'SOFTWARE', 'Back Up Files Automatically with File History', 'Microsoft', 'Windows 10, Windows 11', NULL, '/tips/windows-file-history.jpg',
$tip$File History copies your files to an external drive every hour and keeps older versions.

1. Plug in an external hard drive or a big USB drive.
2. Open Control Panel, System and Security, File History (or search "File History").
3. Select the drive and click Turn on.
4. Advanced settings: choose how often to copy and how long to keep versions.
5. Restore: search "Restore your files with File History", find the file or older version, and click the green restore button.
6. Keep the drive plugged in, or connect it regularly.

Windows 11 also has the Windows Backup app (to OneDrive). An external drive backup works without internet and protects against ransomware if you unplug it after.$tip$,
ARRAY['File History', 'External drive'], now() - interval '713 minutes'),

('software-tip-windows-safe-mode', 'SOFTWARE', 'Start Windows in Safe Mode', 'Microsoft', 'Windows 10, Windows 11', NULL, '/tips/windows-safe-mode.jpg',
$tip$Safe Mode starts Windows with only basic drivers. Use it to remove bad drivers, programs or malware.

1. Hold Shift and click Restart (from the Start menu or the sign-in screen).
2. Choose Troubleshoot, Advanced options, Startup Settings, Restart.
3. Press 4 for Safe Mode, or 5 for Safe Mode with Networking (internet).
4. Windows won't start at all? It shows Automatic Repair after 2 or 3 failed starts. Choose Advanced options there.
5. To leave Safe Mode, just restart.

In Safe Mode: uninstall the last program or driver, run a virus scan, or roll back the graphics driver (Device Manager, Display adapters, Properties, Driver, Roll Back).$tip$,
ARRAY['Startup Settings'], now() - interval '714 minutes'),

('software-tip-windows-battery-saver', 'SOFTWARE', 'Make a Laptop Battery Last Longer (Battery Saver and Power Mode)', 'Microsoft', 'Windows 10, Windows 11', NULL, '/tips/windows-battery-saver.jpg',
$tip$1. Open Settings, System, Power and battery.
2. Battery saver (or Energy saver): set it to turn on at 20% or 30%, or turn it on now.
3. Power mode: choose "Best power efficiency" when on battery.
4. Lower screen brightness. The screen uses the most power.
5. Close apps you don't need, and turn off Bluetooth and keyboard backlight when not in use.
6. "Battery usage" shows which apps use the most power.

Battery dropping very fast even with this? Check its wear with a battery report (see our battery report tip). A worn battery needs replacing.$tip$,
ARRAY['Settings', 'Battery saver'], now() - interval '715 minutes'),

('software-tip-windows-keyboard-language', 'SOFTWARE', 'Keyboard Typing Wrong Letters? Fix the Keyboard Language', 'Microsoft', 'Windows 10, Windows 11', NULL, '/tips/windows-keyboard-language.jpg',
$tip$Typing @ gives " or Z and Y are swapped? The keyboard layout is wrong.

1. Look at the taskbar near the clock: ENG, FRA, US, UK.
2. Switch layouts: press the Windows key and Space (or Alt and Shift).
3. Remove the wrong one: Settings, Time and language, Language and region, click the three dots next to the language, Language options, then remove the extra keyboard.
4. Add the right one: in Language options, Add a keyboard. Most keyboards in Uganda use "US" or "United Kingdom".
5. Numbers not typing? Press Num Lock. Capital letters only? Press Caps Lock.

Still wrong letters with the right layout? A key may be stuck or damaged. Test with the on-screen keyboard (search "On-Screen Keyboard").$tip$,
ARRAY['Settings', 'Language and region'], now() - interval '716 minutes'),

('software-tip-windows-accessibility', 'SOFTWARE', 'Windows Accessibility: Narrator, Magnifier and Sticky Keys', 'Microsoft', 'Windows 10, Windows 11', NULL, '/tips/windows-accessibility.jpg',
$tip$Open Settings, Accessibility.

1. Magnifier: Windows key and plus to zoom in, Windows key and minus to zoom out, Windows key and Esc to close.
2. Narrator reads the screen aloud: Ctrl, Windows key and Enter to start or stop.
3. Text size and Mouse pointer size: make them bigger for older users.
4. Colour filters and Contrast themes help with colour blindness and low vision.
5. Live captions (Windows 11): Windows key, Ctrl and L to show subtitles for any audio.

Strange beeps and keys sticking? You may have pressed Shift five times and turned on Sticky Keys. Turn it off in Accessibility, Keyboard, and untick the keyboard shortcut.$tip$,
ARRAY['Settings', 'Accessibility'], now() - interval '717 minutes'),

('software-tip-windows-mobile-hotspot', 'SOFTWARE', 'Share a Laptop''s Internet with a Phone (Mobile Hotspot)', 'Microsoft', 'Windows 10, Windows 11', NULL, '/tips/windows-mobile-hotspot.jpg',
$tip$Useful when the laptop is on a cable or a modem and the phone needs internet.

1. Open Settings, Network and internet, Mobile hotspot.
2. "Share my internet connection from": choose Ethernet or Wi-Fi.
3. Click Edit (or Properties) to set the name and a strong password.
4. Turn Mobile hotspot on.
5. On the phone, connect to that Wi-Fi name with the password.

Up to 8 devices can connect. Turn it off when done to save battery. Some laptops can't share Wi-Fi to Wi-Fi at the same time. Use a cable for the laptop if it fails.$tip$,
ARRAY['Settings', 'Mobile hotspot'], now() - interval '718 minutes'),

('software-tip-windows-saved-wifi', 'SOFTWARE', 'Forget a Wi-Fi Network and See Saved Wi-Fi Passwords on Windows', 'Microsoft', 'Windows 10, Windows 11', NULL, '/tips/windows-saved-wifi.jpg',
$tip$Forget a network (fixes many connection problems):
Settings, Network and internet, Wi-Fi, Manage known networks, choose it, Forget. Then connect again.

See the password of your own saved network:
1. Windows 11: Settings, Network and internet, Wi-Fi, the network's properties, View Wi-Fi security key.
2. Or open Terminal and run:
netsh wlan show profile name="Network Name" key=clear
The password appears next to "Key Content".
3. List all saved networks: netsh wlan show profiles

Only for networks you're allowed to use. Share your home Wi-Fi with guests using a QR code from your phone instead (see our Wi-Fi QR tip).$tip$,
ARRAY['Settings', 'netsh'], now() - interval '719 minutes'),

('software-tip-windows-black-screen', 'SOFTWARE', 'Black Screen After Signing In to Windows', 'Microsoft', 'Windows 10, Windows 11', NULL, '/tips/windows-black-screen.jpg',
$tip$Mouse moves but nothing else shows? Try these in order.

1. Press the Windows key, Ctrl, Shift and B. This restarts the graphics driver (you'll hear a beep).
2. Press Windows key and P, then choose "PC screen only". The picture may be going to a missing monitor or projector.
3. Press Ctrl, Shift and Esc to open Task Manager. Click Run new task, type explorer.exe, and press Enter.
4. Wait. After a big update, Windows can take 10 to 20 minutes to finish.
5. Still black? Start in Safe Mode (see our Safe Mode tip) and roll back or reinstall the graphics driver.

Completely black with no mouse and no light on the laptop? That's usually a hardware or power fault. Bring it in.$tip$,
ARRAY['Task Manager', 'Keyboard shortcuts'], now() - interval '720 minutes'),

('software-tip-windows-tv-projector', 'SOFTWARE', 'Show a Laptop on a TV or Projector', 'Microsoft', 'Windows 10, Windows 11', NULL, '/tips/windows-tv-projector.jpg',
$tip$1. Connect with an HDMI cable (or VGA on older projectors, or a USB-C to HDMI adapter).
2. Choose the right input on the TV or projector (HDMI 1, HDMI 2).
3. Press Windows key and P:
   Duplicate: same picture on both.
   Extend: TV is a second screen.
   Second screen only: picture only on the TV.
4. Nothing showing? Settings, System, Display, Detect. Lower the resolution to 1920 x 1080 or 1280 x 720.
5. No sound from the TV: click the speaker icon on the taskbar and choose the TV as output.
6. Wireless: Windows key and K connects to Miracast TVs.

Always test before a meeting. Bring your own adapter.$tip$,
ARRAY['HDMI cable', 'Windows key and P'], now() - interval '721 minutes'),

('software-tip-windows-optimize-drives', 'SOFTWARE', 'Optimise Drives: Defrag for Hard Drives, TRIM for SSDs', 'Microsoft', 'Windows 10, Windows 11', NULL, '/tips/windows-optimize-drives.jpg',
$tip$1. Search for "Defragment and Optimise Drives" and open it.
2. The list shows each drive's type: Hard disk drive or Solid state drive.
3. Hard disk: if "Current status" shows over 10% fragmented, click Optimise. Takes a while.
4. SSD: Optimise runs TRIM, which keeps it fast. It doesn't defragment, and that's correct.
5. Scheduled optimisation should be On (weekly).

Don't use old third-party defrag tools on an SSD. A slow PC with an old hard disk gains far more from upgrading to an SSD (see our SSD tip).$tip$,
ARRAY['Optimise Drives'], now() - interval '722 minutes'),

('software-tip-windows-old-folder', 'SOFTWARE', 'Delete the Windows.old Folder Safely', 'Microsoft', 'Windows 10, Windows 11', NULL, '/tips/windows-old-folder.jpg',
$tip$After a big Windows update or upgrade, the old system is kept in C:\Windows.old. It can be 15 to 30 GB.

1. Make sure the new Windows works well and none of your files are missing (check Windows.old\Users if you're unsure).
2. Open Settings, System, Storage, Temporary files.
3. Tick "Previous Windows installation(s)" and click Remove files.
4. Or search "Disk Cleanup", click Clean up system files, and tick Previous Windows installations.

Once deleted, you can't go back to the previous version. Windows removes it by itself after about 10 days anyway. Don't try to delete it by hand in File Explorer.$tip$,
ARRAY['Settings', 'Disk Cleanup'], now() - interval '723 minutes'),

('software-tip-windows-missing-dll', 'SOFTWARE', '"DLL Is Missing" Errors: Fix Them Without DLL Websites', 'Microsoft', 'Windows 10, Windows 11', NULL, '/tips/windows-missing-dll.jpg',
$tip$"The program can't start because MSVCP140.dll (or similar) is missing."

1. Don't download single DLL files from websites. They are often outdated or contain malware.
2. Most missing DLLs (MSVCP, VCRUNTIME) come from the Microsoft Visual C++ Redistributable. Download the latest x64 and x86 versions from Microsoft's website and install both.
3. Games asking for d3dx9 or xinput: install the DirectX End-User Runtime from Microsoft.
4. Reinstall the program that shows the error.
5. Windows files missing? Run DISM and SFC (see our SFC tip).

Antivirus removed the DLL? Check its quarantine. It may have been a cracked program.$tip$,
ARRAY['Visual C++ Redistributable', 'DirectX'], now() - interval '724 minutes'),

('software-tip-windows-camera-not-working', 'SOFTWARE', 'Laptop Camera Not Working on Windows', 'Microsoft', 'Windows 10, Windows 11', NULL, '/tips/windows-camera-not-working.jpg',
$tip$1. Check for a privacy shutter over the camera, or a camera key (often F8 or F10, sometimes with Fn).
2. Test with the Camera app. Works there but not in Zoom or Teams? Check that app's video settings and select the right camera.
3. Permissions: Settings, Privacy and security, Camera. Turn on Camera access and allow the apps you need.
4. Close other apps. Only one app can use the camera at a time.
5. Device Manager, Cameras (or Imaging devices): if it shows a yellow mark or is missing, update or reinstall the driver from the laptop maker's site.
6. Antivirus webcam protection can also block it.

Not listed in Device Manager at all after a repair? The camera cable may be loose.$tip$,
ARRAY['Camera app', 'Device Manager'], now() - interval '725 minutes'),

('software-tip-windows-microphone', 'SOFTWARE', 'Microphone Not Working on Windows', 'Microsoft', 'Windows 10, Windows 11', NULL, '/tips/windows-microphone.jpg',
$tip$1. Settings, System, Sound, Input: choose the right microphone. Speak and watch the level bar move.
2. Click the microphone, check the volume isn't 0, and click Start test.
3. Permissions: Settings, Privacy and security, Microphone. Turn on access for apps.
4. In Zoom, Teams or WhatsApp: check their audio settings use the same microphone.
5. Headset with one plug (4 pin) on a PC with two jacks? It needs a splitter adapter.
6. Bluetooth headset sounding bad when the mic is on? That's normal for Bluetooth hands-free mode. Use a USB or wired mic for clearer calls.

Laptop mic dead after a screen repair? The mic is often in the screen and its cable may be loose.$tip$,
ARRAY['Settings', 'Sound'], now() - interval '726 minutes'),

('software-tip-windows-pdf-files', 'SOFTWARE', 'Open, Fill, Sign and Combine PDF Files for Free on Windows', 'Microsoft', 'Windows 10, Windows 11', NULL, '/tips/windows-pdf-files.jpg',
$tip$1. Open and read: Microsoft Edge opens PDFs. Right-click the PDF, Open with, Microsoft Edge.
2. Fill forms, highlight, draw a signature: use the Draw and Add text tools at the top of Edge. Save when done.
3. Make a PDF from anything: Print, choose "Microsoft Print to PDF".
4. Word: File, Save As, PDF. Word can also open a PDF to edit its text.
5. Combine, split or compress PDFs: free desktop tools like PDF24 Creator work offline.

Avoid uploading ID cards, bank statements and contracts to random online PDF websites. Use offline tools for private documents.$tip$,
ARRAY['Microsoft Edge', 'Microsoft Print to PDF'], now() - interval '727 minutes'),

('software-tip-windows-ipconfig', 'SOFTWARE', 'Find Your IP Address and Fix the Network with ipconfig', 'Microsoft', 'Windows 10, Windows 11', NULL, '/tips/windows-ipconfig.jpg',
$tip$Open Terminal or Command Prompt.

ipconfig: shows your IP address (IPv4) and Default Gateway (the router).
ipconfig /all: more detail, including the physical (MAC) address and DNS servers.
ping 192.168.1.1: test the router (use your gateway address). Replies mean the PC reaches the router.
ping 8.8.8.8: test the internet.
ipconfig /flushdns: clears the DNS cache. Fixes some websites that won't open.
ipconfig /release then ipconfig /renew: gets a new IP address from the router.

IP starting with 169.254? The PC didn't get an address from the router. Restart the router, check the cable or Wi-Fi, then run /renew.$tip$,
ARRAY['Terminal', 'ipconfig', 'ping'], now() - interval '728 minutes'),

('software-tip-windows-wsl', 'SOFTWARE', 'Run Linux Inside Windows with WSL', 'Microsoft', 'Windows 10, Windows 11', NULL, '/tips/windows-wsl.jpg',
$tip$WSL (Windows Subsystem for Linux) runs Ubuntu inside Windows, with no dual boot.

1. Right-click Start, open Terminal (Admin), and run:
wsl --install
2. Restart the PC. Ubuntu finishes installing and asks you to create a Linux username and password.
3. Open Ubuntu from the Start menu, or Terminal's dropdown.
4. Your Windows files are at /mnt/c.
5. Update it like normal Ubuntu: sudo apt update and sudo apt upgrade.

If it fails, turn on Virtualization (Intel VT-x or AMD SVM) in the BIOS. Great for learning the Linux commands in our Linux tips.$tip$,
ARRAY['WSL', 'Terminal'], now() - interval '729 minutes')
ON CONFLICT ("id") DO NOTHING;
