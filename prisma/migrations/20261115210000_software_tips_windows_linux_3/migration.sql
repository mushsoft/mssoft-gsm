-- One-time content load (no schema change): 20 more Windows tips and 10 more
-- Linux tips, each with its own photo from public/tips (free Pexels photos).
-- Fixed ids + ON CONFLICT DO NOTHING: added once, admin edits never overwritten.

INSERT INTO "RepairGuide" ("id", "category", "title", "brand", "modelName", "videoUrl", "thumbnail", "content", "toolsUsed", "createdAt") VALUES
('software-tip-windows-snipping-tool', 'SOFTWARE', 'Snipping Tool: Screenshot Part of the Screen and Copy Text from Images', 'Windows', 'Windows 10, Windows 11', NULL, '/tips/windows-snipping-tool.jpg',
$tip$1. Press Windows key, Shift and S. Drag over the area you want.
2. The capture is copied. Paste it straight into WhatsApp, Word or an email with Ctrl and V.
3. Click the pop-up to open it in Snipping Tool: draw, highlight, crop or save.
4. Windows 11: Text actions (the text icon) copies text out of the screenshot, even from photos and PDFs.
5. Record video: open Snipping Tool and switch to the video camera icon.
6. Make Print Screen open it: Settings, Accessibility, Keyboard, "Use the Print screen key to open screen capture".$tip$,
ARRAY['Snipping Tool'], now() - interval '1100 minutes'),

('software-tip-windows-phone-link', 'SOFTWARE', 'Phone Link: Texts, Calls and Photos from Your Phone on Windows', 'Windows', 'Windows 10, Windows 11', NULL, '/tips/windows-phone-link.jpg',
$tip$1. Open Phone Link on the PC (search for it in Start).
2. Choose Android or iPhone and scan the QR code with the phone.
3. Android: install or open "Link to Windows" (built into Samsung: quick settings, Link to Windows). Allow the permissions.
4. Now on the PC you can read and send SMS, see notifications, make calls through the phone (needs Bluetooth) and copy recent photos.
5. iPhone: messages, calls and notifications work. Photos don't.

Turn it off on shared computers: everyone using the PC could read your messages.$tip$,
ARRAY['Phone Link', 'Link to Windows'], now() - interval '1101 minutes'),

('software-tip-windows-search-not-working', 'SOFTWARE', 'Windows Search Not Finding Files or Apps', 'Windows', 'Windows 10, Windows 11', NULL, '/tips/windows-search-not-working.jpg',
$tip$1. Restart Windows Explorer: Ctrl, Shift and Esc, find Windows Explorer, right-click, Restart.
2. Restart the PC (a real restart, not shut down with Fast Startup).
3. Settings, Privacy and security, Searching Windows: choose Enhanced to search the whole PC, or add folders under Classic.
4. Run the indexer troubleshooter on the same page.
5. Rebuild the index: Advanced indexing options, Advanced, Rebuild. It takes a while.
6. Still broken? Run DISM and SFC (see our SFC tip).

Quick workaround: open File Explorer, go to the folder, and use the search box at the top right.$tip$,
ARRAY['Task Manager', 'Indexing Options'], now() - interval '1102 minutes'),

('software-tip-windows-file-explorer', 'SOFTWARE', 'File Explorer Tips That Save Time', 'Windows', 'Windows 10, Windows 11', NULL, '/tips/windows-file-explorer.jpg',
$tip$Windows key and E: open File Explorer.
Ctrl and T: new tab (Windows 11). Drag files between tabs.
Pin folders: right-click a folder, Pin to Quick access.
Search: type *.pdf in the search box to find all PDFs in a folder. Add size:large for big files.
Sort and group: right-click empty space, Sort by or Group by (for example Date modified).
Alt and Enter: properties (size, location).
F2: rename. Select many files and press F2 to rename them all with numbers.
Ctrl and Shift and N: new folder.
Show file extensions and hidden files: see our file extensions tip.$tip$,
ARRAY['File Explorer'], now() - interval '1103 minutes'),

('software-tip-windows-recycle-bin', 'SOFTWARE', 'Get Back Deleted Files from the Recycle Bin', 'Windows', 'Windows 10, Windows 11', NULL, '/tips/windows-recycle-bin.jpg',
$tip$1. Open Recycle Bin on the Desktop (or type it in File Explorer's address bar).
2. Find the file (sort by Date Deleted), right-click it, Restore. It goes back to its original folder.
3. Ctrl and Z straight after deleting also undoes it.
4. Not in the Recycle Bin? Files deleted with Shift and Delete, from USB drives, memory cards or network folders skip it. See our recover deleted files tip, and stop using that drive.
5. Right-click Recycle Bin, Properties, to set its size or turn on "Display delete confirmation".

Emptying it permanently deletes files. Check it before you empty.$tip$,
ARRAY['Recycle Bin'], now() - interval '1104 minutes'),

('software-tip-windows-system-information', 'SOFTWARE', 'Find Your PC''s Model, BIOS Version and Full Details (msinfo32)', 'Windows', 'Windows 10, Windows 11', NULL, '/tips/windows-system-information.jpg',
$tip$1. Press Windows key and R, type msinfo32 and press Enter.
2. System Summary shows:
   System Manufacturer and Model (needed for drivers).
   Processor and Installed RAM.
   BIOS Version and Date.
   BIOS Mode (UEFI or Legacy) and Secure Boot State.
3. Graphics and sound details: Windows key and R, type dxdiag.
4. Serial number: open Terminal and run: Get-CimInstance Win32_BIOS | Select-Object SerialNumber, or check the sticker under the laptop.

Use the exact model when downloading drivers from the maker's website.$tip$,
ARRAY['msinfo32', 'dxdiag'], now() - interval '1105 minutes'),

('software-tip-windows-new-drive-not-showing', 'SOFTWARE', 'New Hard Drive or SSD Not Showing in File Explorer', 'Windows', 'Windows 10, Windows 11', NULL, '/tips/windows-new-drive-not-showing.jpg',
$tip$A brand new drive must be prepared before Windows shows it.

1. Right-click Start, Disk Management.
2. A pop-up asks to initialise the disk: choose GPT and OK.
3. Find the disk showing "Unallocated" (check the size so you pick the right one).
4. Right-click the unallocated space, New Simple Volume, Next, choose a letter, format as NTFS, Finish.
5. The drive now appears in File Explorer.

Careful: never format or delete partitions on a disk that already has data. Not listed in Disk Management at all? Check the cable or slot, and the BIOS.$tip$,
ARRAY['Disk Management'], now() - interval '1106 minutes'),

('software-tip-format-usb-drive', 'SOFTWARE', 'Format a USB Drive or Memory Card: FAT32, exFAT or NTFS?', 'Windows', 'Windows 10, Windows 11', NULL, '/tips/format-usb-drive.jpg',
$tip$Formatting erases everything on the drive. Copy files off first.

1. Open File Explorer, right-click the drive, Format.
2. Choose the file system:
   FAT32: works everywhere (TVs, car radios, old devices), but no single file over 4 GB.
   exFAT: big files, works on Windows, Mac, Android and most new TVs. Best for most USB drives and cards.
   NTFS: Windows only. Good for external hard drives used with Windows PCs.
3. Keep Quick Format ticked and click Start.

Drive shows the wrong size or won't format? It may be fake or damaged. See our write-protected USB tip.$tip$,
ARRAY['File Explorer', 'Format'], now() - interval '1107 minutes'),

('software-tip-bios-update-safely', 'SOFTWARE', 'Update a Laptop BIOS Safely', 'Windows', 'Laptops and desktops', NULL, '/tips/bios-update-safely.jpg',
$tip$A BIOS update can fix bugs and security problems. A failed one can stop the computer starting, so only update when needed.

1. Get it only from the maker: HP Support Assistant, Lenovo Vantage, Dell SupportAssist, MyASUS, or the support website for your exact model (see our msinfo32 tip).
2. Plug in the charger and make sure the battery is above 50%.
3. Suspend BitLocker first if it's on (Control Panel, BitLocker, Suspend protection).
4. Close all programs and run the update. The PC restarts and may show a progress bar or blank screen for several minutes.
5. Don't turn it off or unplug it until Windows starts again.

Power cuts are the main risk. Use a UPS for desktops.$tip$,
ARRAY['Manufacturer support app'], now() - interval '1108 minutes'),

('software-tip-windows-firewall', 'SOFTWARE', 'Windows Firewall: Keep It On and Allow One App When Needed', 'Windows', 'Windows 10, Windows 11', NULL, '/tips/windows-firewall.jpg',
$tip$1. Open Windows Security, Firewall and network protection.
2. All three (Domain, Private, Public) should say "Firewall is on". Turn on any that are off.
3. A program needs network access (for example a game server or a shop's POS software)? Click "Allow an app through firewall", Change settings, tick it for Private networks only.
4. Something broke after changing rules? Click "Restore firewalls to default".
5. Using another antivirus with its own firewall? Windows shows that instead, which is fine.

Never turn the firewall off completely to "fix" a program. Allow just that program.$tip$,
ARRAY['Windows Security'], now() - interval '1109 minutes'),

('software-tip-windows-optional-updates', 'SOFTWARE', 'Find Missing Drivers in Windows Optional Updates', 'Windows', 'Windows 10, Windows 11', NULL, '/tips/windows-optional-updates.jpg',
$tip$1. Open Settings, Windows Update, Advanced options, Optional updates.
2. Open Driver updates. Windows lists drivers for your hardware.
3. Tick the ones for devices that aren't working (touchpad, Bluetooth, card reader, camera) and click Download and install.
4. Restart.

Only install optional drivers when something isn't working. If everything works, leave them. Graphics drivers are often better from Intel, AMD or NVIDIA directly, or from the laptop maker.$tip$,
ARRAY['Windows Update'], now() - interval '1110 minutes'),

('software-tip-printer-queue-stuck', 'SOFTWARE', 'Printer Stuck: Clear the Print Queue on Windows', 'Windows', 'Windows 10, Windows 11', NULL, '/tips/printer-queue-stuck.jpg',
$tip$1. Settings, Bluetooth and devices, Printers and scanners, your printer, Open print queue. Click the three dots, Cancel all.
2. Still stuck? Restart the Print Spooler:
   Press Windows key and R, type services.msc, find Print Spooler, right-click, Stop.
3. Open C:\Windows\System32\spool\PRINTERS and delete the files inside (not the folder).
4. Back in Services, right-click Print Spooler, Start.
5. Turn the printer off and on, and print again.

Printer shows Offline? Check the USB cable or Wi-Fi, and see our printer not printing tip.$tip$,
ARRAY['Print queue', 'Services'], now() - interval '1111 minutes'),

('software-tip-windows-hello-pin-forgot', 'SOFTWARE', 'Forgot Your Windows PIN? Reset It', 'Windows', 'Windows 10, Windows 11', NULL, '/tips/windows-hello-pin-forgot.jpg',
$tip$1. On the sign-in screen, click "I forgot my PIN" under the PIN box.
2. Microsoft account: enter your account password and the code sent to your email or phone, then set a new PIN.
3. Local account: click Sign-in options and use your password instead, then set a new PIN in Settings, Accounts, Sign-in options, PIN, "I forgot my PIN".
4. Forgot the password too? See our Windows forgot password tip.

The PIN only works on that one PC, so a short PIN is fine. Don't reuse your mobile money or bank PIN.$tip$,
ARRAY['Sign-in options'], now() - interval '1112 minutes'),

('software-tip-windows-default-browser', 'SOFTWARE', 'Change Your Default Web Browser on Windows', 'Windows', 'Windows 10, Windows 11', NULL, '/tips/windows-default-browser.jpg',
$tip$1. Install the browser you want (Chrome, Firefox, Opera) from its official website.
2. Open Settings, Apps, Default apps.
3. Click the browser's name, then "Set default" at the top.
4. Windows 10: Settings, Apps, Default apps, Web browser, and pick it.
5. PDFs: in the same page, set .pdf to your favourite PDF reader if you don't want them opening in the browser.

Edge may still open for some Windows links (like Help). That's normal. Bookmarks and passwords can be imported in the new browser's settings.$tip$,
ARRAY['Default apps'], now() - interval '1113 minutes'),

('software-tip-chrome-profiles', 'SOFTWARE', 'Chrome Profiles and Guest Mode for Shared Computers', 'Windows', 'Chrome on Windows, Mac and Linux', NULL, '/tips/chrome-profiles.jpg',
$tip$1. Click your profile picture at the top right of Chrome, then Add.
2. Each person gets their own profile with separate bookmarks, history, passwords and Google sign-in.
3. Switch profiles from the same picture.
4. Guest mode: for visitors and cyber café customers. Nothing is saved after the window closes.
5. Incognito (Ctrl, Shift and N) doesn't save history on that PC, but your activity can still be seen by your employer, school or internet provider.

On public computers, always sign out and close the browser when done.$tip$,
ARRAY['Google Chrome'], now() - interval '1114 minutes'),

('software-tip-browser-extensions-safety', 'SOFTWARE', 'Browser Extensions: Remove Bad Ones and Install Safely', 'Windows', 'Chrome, Edge, Firefox', NULL, '/tips/browser-extensions-safety.jpg',
$tip$Extensions can read everything on the pages you visit. Bad ones inject ads, change your search engine and steal passwords.

1. Check what's installed: type chrome://extensions (Chrome) or edge://extensions (Edge) in the address bar.
2. Remove anything you don't recognise or don't use.
3. Only install from the official store (Chrome Web Store, Edge Add-ons) with many users and good reviews.
4. Be careful with "free video downloader", "coupon" and "PDF converter" extensions.
5. Search engine changed by itself? Reset settings: chrome://settings/reset.

Fewer extensions also make the browser faster.$tip$,
ARRAY['Chrome', 'Edge'], now() - interval '1115 minutes'),

('software-tip-word-autorecover', 'SOFTWARE', 'Never Lose Work in Word: AutoSave and AutoRecover', 'Windows', 'Microsoft Word', NULL, '/tips/word-autorecover.jpg',
$tip$1. Save early: give the document a name as soon as you start (Ctrl and S).
2. AutoRecover: File, Options, Save. Tick "Save AutoRecover information every" and set 2 minutes.
3. AutoSave (top left switch) saves every few seconds when the file is in OneDrive.
4. After a crash or power cut, open Word again. The Document Recovery panel shows recovered versions. Save the one you need.
5. Never saved it? File, Info, Manage Document, Recover Unsaved Documents.
6. Older version of a OneDrive file: File, Info, Version History.

Keep a UPS or charged laptop for long documents during power cuts.$tip$,
ARRAY['Microsoft Word'], now() - interval '1116 minutes'),

('software-tip-excel-basics', 'SOFTWARE', 'Excel Basics: Freeze Headers, Sort, Filter and Quick Totals', 'Windows', 'Microsoft Excel', NULL, '/tips/excel-basics.jpg',
$tip$1. Freeze the header row: View, Freeze Panes, Freeze Top Row. Headings stay visible while you scroll.
2. Filter: click inside the data and press Ctrl, Shift and L. Use the arrows on headings to filter and sort.
3. Quick total: select the cell under a column of numbers and press Alt and =.
4. Status bar: select numbers to see their Sum, Average and Count at the bottom.
5. Make it a table: Ctrl and T for colours, filters and formulas that grow with the data.
6. Fill a series: type 1 and 2, select both, drag the small square down.
7. Print neatly: Page Layout, Orientation and "Fit to 1 page wide".$tip$,
ARRAY['Microsoft Excel'], now() - interval '1117 minutes'),

('software-tip-windows-scan-documents', 'SOFTWARE', 'Scan Documents to PDF on Windows', 'Windows', 'Windows 10, Windows 11', NULL, '/tips/windows-scan-documents.jpg',
$tip$1. Connect the printer or scanner and install its software from the maker's website if needed.
2. Open the Windows Scan app (free from the Microsoft Store) or "Windows Fax and Scan".
3. Choose the scanner, source (flatbed or feeder) and file type (PDF or JPEG).
4. 300 dpi is good for documents. 600 dpi for photos.
5. Click Scan and choose where to save.
6. Many printers' own apps (HP Smart, Epson Scan, Canon IJ Scan) can scan several pages into one PDF.

No scanner? Your phone can scan very well (see our scan documents tips).$tip$,
ARRAY['Windows Scan', 'Printer software'], now() - interval '1118 minutes'),

('software-tip-windows-sound-enhancements', 'SOFTWARE', 'Better Sound on Windows: Volume Mixer, Enhancements and Mono Audio', 'Windows', 'Windows 10, Windows 11', NULL, '/tips/windows-sound-enhancements.jpg',
$tip$1. Volume per app: right-click the speaker icon, Volume mixer. Lower a loud browser without changing a video call.
2. Choose the output: click the speaker icon and pick speakers, headphones or HDMI TV.
3. Settings, System, Sound, choose the device: Audio enhancements (or Enhance audio) and Spatial sound (Windows Sonic) for headphones.
4. Quiet laptop speakers: Control Panel, Sound, Speakers, Properties, Enhancements, Loudness Equalization (on many laptops).
5. One-ear headset? Settings, Accessibility, Audio, Mono audio.

Laptop makers often include an audio app (Dolby, DTS, Realtek, B&O). Check its presets too.$tip$,
ARRAY['Volume mixer', 'Sound settings'], now() - interval '1119 minutes'),

('software-tip-linux-flatpak', 'SOFTWARE', 'Install Apps with Flatpak and Flathub on Linux', 'Linux', 'Ubuntu, Linux Mint', NULL, '/tips/linux-flatpak.jpg',
$tip$Flathub has many up-to-date apps that work on any Linux.

1. Linux Mint: Flatpak is built in. Software Manager shows Flathub apps.
2. Ubuntu: install it with:
sudo apt install flatpak
flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo
Then restart.
3. Find apps at flathub.org. Each page shows the install command, for example:
flatpak install flathub org.videolan.VLC
4. Update all Flatpak apps: flatpak update
5. Remove: flatpak uninstall name, then flatpak uninstall --unused to free space.

Look for the "Verified" badge on Flathub to be sure the app comes from its real developer.$tip$,
ARRAY['Flatpak', 'Flathub'], now() - interval '1120 minutes'),

('software-tip-linux-mint-updates-kernels', 'SOFTWARE', 'Linux Mint Update Manager: Updates, Kernels and New Versions', 'Linux', 'Linux Mint', NULL, '/tips/linux-mint-updates-kernels.jpg',
$tip$1. Open Update Manager (shield icon). Click Refresh, then Install Updates.
2. It asks to set up Timeshift first. Do it, so you can undo bad updates (see our Timeshift tip).
3. Kernels: View, Linux Kernels. Stay on the recommended one. Try a newer kernel only for new hardware that doesn't work.
4. Mirrors: Edit, Software Sources, choose a fast local mirror for quicker downloads.
5. New Mint version (for example 21 to 22): follow the official upgrade guide on linuxmint.com. Make a backup first.

Updates are safe to install regularly. Don't skip security updates.$tip$,
ARRAY['Update Manager', 'Timeshift'], now() - interval '1121 minutes'),

('software-tip-linux-share-folders-windows', 'SOFTWARE', 'Share Folders Between Linux and Windows on the Same Network', 'Linux', 'Ubuntu, Linux Mint', NULL, '/tips/linux-share-folders-windows.jpg',
$tip$Open a Windows shared folder from Linux:
1. Open Files, Other Locations (Ubuntu) or press Ctrl and L.
2. Type smb://192.168.1.20/SharedFolder (the Windows PC's IP and share name) and Connect.
3. Enter the Windows username and password.

Share a Linux folder with Windows:
1. Install Samba: sudo apt install samba
2. Set a Samba password for your user: sudo smbpasswd -a yourusername
3. Right-click the folder, Properties, Local Network Share (Mint: Sharing Options), tick Share this folder.
4. On Windows, open \\LINUX-IP in File Explorer and sign in with that username and Samba password.

Both computers must be on the same private network.$tip$,
ARRAY['Samba', 'Files app'], now() - interval '1122 minutes'),

('software-tip-linux-laptop-battery', 'SOFTWARE', 'Make a Laptop Battery Last Longer on Linux', 'Linux', 'Ubuntu, Linux Mint', NULL, '/tips/linux-laptop-battery.jpg',
$tip$1. Ubuntu: Settings, Power, choose Power Saver mode. Mint: Power Management settings.
2. Lower screen brightness and turn off keyboard backlight and Bluetooth when not needed.
3. Check what uses power: sudo apt install powertop, then sudo powertop (Tab to switch views, Q to quit).
4. TLP gives automatic power saving on older laptops: sudo apt install tlp, then sudo tlp start. On newer Ubuntu it replaces the built-in power-profiles tool, so choose one or the other.
5. Check battery wear: upower -i $(upower -e | grep BAT) and compare "energy-full" with "energy-full-design".

Close heavy browser tabs. Browsers use the most power on most laptops.$tip$,
ARRAY['Power settings', 'powertop', 'TLP'], now() - interval '1123 minutes'),

('software-tip-linux-backups-app', 'SOFTWARE', 'Back Up Your Personal Files with the Ubuntu Backups App (Deja Dup)', 'Linux', 'Ubuntu, Linux Mint', NULL, '/tips/linux-backups-app.jpg',
$tip$1. Open Backups (install with sudo apt install deja-dup if missing).
2. Folders to save: your Home folder is selected. Add or exclude folders (for example exclude Downloads).
3. Storage location: an external drive, a network folder or Google Drive.
4. Turn on automatic backups and choose daily or weekly.
5. Set an encryption password and write it down. Without it, the backup can't be restored.
6. Restore: open Backups, Restore, choose the date and the files.

Timeshift protects the system. Backups protects your documents and photos. Use both.$tip$,
ARRAY['Backups (Deja Dup)'], now() - interval '1124 minutes'),

('software-tip-linux-nano-editor', 'SOFTWARE', 'Edit Text Files in the Terminal with nano', 'Linux', 'All Linux', NULL, '/tips/linux-nano-editor.jpg',
$tip$1. Open a file: nano notes.txt (creates it if it doesn't exist).
2. System files need sudo: sudo nano /etc/hosts
3. Type and move with the arrow keys.
4. Shortcuts shown at the bottom (^ means Ctrl):
   Ctrl and O, then Enter: save
   Ctrl and X: exit (asks to save if changed)
   Ctrl and W: search
   Ctrl and K: cut the line
   Ctrl and U: paste
   Alt and U: undo
5. Show line numbers: nano -l filename

Before editing an important system file, make a copy: sudo cp /etc/fstab /etc/fstab.backup$tip$,
ARRAY['nano', 'Terminal'], now() - interval '1125 minutes'),

('software-tip-linux-find-grep', 'SOFTWARE', 'Find Files and Search Inside Them on Linux (find and grep)', 'Linux', 'All Linux', NULL, '/tips/linux-find-grep.jpg',
$tip$Find files by name:
find ~ -iname "*invoice*": anything with "invoice" in the name, in your Home folder
find ~ -name "*.pdf": all PDFs
find ~ -size +500M: files bigger than 500 MB
find ~ -mtime -2: changed in the last 2 days

Search inside files:
grep "password" settings.txt: lines containing the word
grep -i "error" log.txt: ignore upper and lower case
grep -r "Kampala" ~/Documents: search all files in a folder
grep -n "word" file: show line numbers

Searching the whole system? Add 2>/dev/null at the end to hide "Permission denied" messages.$tip$,
ARRAY['find', 'grep'], now() - interval '1126 minutes'),

('software-tip-linux-pipes-redirect', 'SOFTWARE', 'Linux Pipes and Redirects: Combine Commands Like a Pro', 'Linux', 'All Linux', NULL, '/tips/linux-pipes-redirect.jpg',
$tip$The | (pipe) sends one command's output into another:
ls -l | less: scroll through a long list (Q to quit)
history | grep apt: find install commands you typed before
dmesg | grep -i usb: only USB messages
ls | wc -l: count files in a folder
ps aux | grep firefox: find a running program

Save output to a file:
ls > list.txt: write (replaces the file)
date >> log.txt: add to the end
command 2> errors.txt: save only error messages

Combine: sort names.txt | uniq > clean.txt removes duplicate lines.$tip$,
ARRAY['Terminal', 'grep', 'less'], now() - interval '1127 minutes'),

('software-tip-linux-gnome-extensions', 'SOFTWARE', 'Customise Ubuntu with GNOME Extensions', 'Linux', 'Ubuntu', NULL, '/tips/linux-gnome-extensions.jpg',
$tip$1. Install Extension Manager: sudo apt install gnome-shell-extension-manager
2. Open it, go to Browse, and search. Popular ones:
   Dash to Panel: a Windows-style taskbar.
   Clipboard Indicator: clipboard history.
   Caffeine: stops the screen sleeping during videos or presentations.
   Vitals: CPU temperature, RAM and network speed in the top bar.
3. Click Install, then adjust settings with the gear icon.
4. Ubuntu's own dock options: Settings, Ubuntu Desktop (position, size, auto-hide).

After a big Ubuntu upgrade some extensions stop working until they're updated. Turn them off if the desktop acts strange.$tip$,
ARRAY['Extension Manager'], now() - interval '1128 minutes'),

('software-tip-raspberry-pi-intro', 'SOFTWARE', 'Getting Started with a Raspberry Pi', 'Linux', 'Raspberry Pi', NULL, '/tips/raspberry-pi-intro.jpg',
$tip$A Raspberry Pi is a tiny, low-power Linux computer. Great for learning, small projects and home servers.

1. You need: the Pi, its official power supply, a microSD card (32 GB or more), HDMI cable, keyboard and mouse.
2. On your PC, install Raspberry Pi Imager from raspberrypi.com.
3. Choose your Pi model, Raspberry Pi OS, and the microSD card. In the settings, set Wi-Fi, username and password, and enable SSH if you want remote access.
4. Write the card, put it in the Pi, connect everything and power on.
5. Ideas: learn Linux and Python, a media centre for the TV, a network ad blocker, a file server.

Weak phone chargers cause random restarts and corrupted cards. Use the proper power supply.$tip$,
ARRAY['Raspberry Pi Imager', 'microSD card'], now() - interval '1129 minutes')
ON CONFLICT ("id") DO NOTHING;
