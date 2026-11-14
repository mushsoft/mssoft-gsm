-- One-time content load (no schema change): 25 Linux tips (Ubuntu and Linux
-- Mint), each with a thumbnail from public/tips (free Pexels photos).
-- Fixed ids + ON CONFLICT DO NOTHING: added once, admin edits never overwritten.

INSERT INTO "RepairGuide" ("id", "category", "title", "brand", "modelName", "videoUrl", "thumbnail", "content", "toolsUsed", "createdAt") VALUES
('software-tip-linux-which-distro', 'SOFTWARE', 'Linux for Old PCs: Which Version to Choose', 'Linux', 'Ubuntu, Linux Mint', NULL, '/tips/linux-tux.jpg',
$tip$Linux is a free operating system that runs well on PCs too old or slow for Windows 11.

Ubuntu: the most popular. Easy to install, lots of help online. Best with 4 GB of RAM or more.
Linux Mint (Cinnamon): looks and feels like Windows. Great for people switching from Windows.
Linux Mint Xfce or Lubuntu: very light, for old PCs with 2 to 4 GB of RAM.

All are free, include a web browser, office suite (LibreOffice), media player and app store, and get security updates.

Tip: try it from a USB drive first without installing (see our Linux USB tip). Adding an SSD makes any old PC much faster too.$tip$,
ARRAY['Ubuntu', 'Linux Mint'], now() - interval '500 minutes'),

('software-tip-linux-bootable-usb', 'SOFTWARE', 'Make an Ubuntu or Linux Mint USB and Try It Without Installing', 'Linux', 'Ubuntu, Linux Mint', NULL, '/tips/usb-drive-hand.jpg',
$tip$1. Download the ISO from the official site: ubuntu.com/download/desktop or linuxmint.com.
2. On Windows, use Rufus (rufus.ie) or balenaEtcher to write the ISO to a USB drive (8 GB or more, it will be erased).
3. Plug the USB into the PC and open the boot menu (see our BIOS keys tip). Choose the USB drive.
4. Choose "Try Ubuntu" (or start Linux Mint). It runs from the USB without changing anything on the PC.
5. Test Wi-Fi, sound, screen and touchpad before deciding to install.

The live USB is also a great rescue tool for copying files off a PC that won't start (see our file rescue tip).$tip$,
ARRAY['Rufus', 'balenaEtcher', 'USB flash drive (8 GB+)'], now() - interval '499 minutes'),

('software-tip-linux-dual-boot', 'SOFTWARE', 'Install Ubuntu Alongside Windows (Dual Boot)', 'Linux', 'Ubuntu', NULL, '/tips/laptop-desk.jpg',
$tip$Dual boot lets you choose Windows or Ubuntu each time the PC starts.

1. Back up everything first. Changing partitions can lose data if something goes wrong.
2. In Windows: turn off Fast Startup (see our Fast Startup tip), and if BitLocker is on, back up the recovery key and suspend it.
3. Free space: in Windows Disk Management, shrink the C: drive to leave at least 30 GB unallocated.
4. Boot from the Ubuntu USB and choose Install. When asked, pick "Install Ubuntu alongside Windows Boot Manager".
5. After installing, a menu (GRUB) appears at startup to choose the operating system.

Windows menu missing after the install, or Ubuntu menu missing after a Windows update? See our GRUB boot repair tip.$tip$,
ARRAY['Ubuntu installer', 'Disk Management'], now() - interval '498 minutes'),

('software-tip-linux-update', 'SOFTWARE', 'Update Ubuntu and Linux Mint', 'Linux', 'Ubuntu, Linux Mint', NULL, '/tips/code-laptop-dark.jpg',
$tip$1. The easy way: open Software Updater (Ubuntu) or Update Manager (Linux Mint) and click Install Now.
2. The terminal way: open Terminal (Ctrl, Alt and T) and run:
sudo apt update
sudo apt upgrade
Type your password when asked (nothing shows while you type, that's normal) and press Y to confirm.
3. Snap apps on Ubuntu update automatically, or run: sudo snap refresh
4. Restart when the updater asks, especially after kernel updates.
5. Ubuntu LTS versions get security updates for 5 years. Upgrade to the next LTS when yours is near the end.$tip$,
ARRAY['Terminal', 'Software Updater'], now() - interval '497 minutes'),

('software-tip-linux-install-software', 'SOFTWARE', 'Install Software on Linux', 'Linux', 'Ubuntu, Linux Mint', NULL, '/tips/linux-tux.jpg',
$tip$1. App store: open App Center (Ubuntu) or Software Manager (Linux Mint), search for an app, and click Install.
2. Terminal with apt: sudo apt install vlc (replace vlc with the app name). Remove with: sudo apt remove vlc
3. Snap (Ubuntu): sudo snap install name
4. Flatpak (Linux Mint has it built in): many apps are on flathub.org.
5. .deb files: some companies (Google Chrome, Zoom) offer a .deb download. Open it with the app store, or run: sudo apt install ./file.deb

Only install from the app store or the software maker's official site, just like on Windows.$tip$,
ARRAY['App Center', 'apt', 'Snap'], now() - interval '496 minutes'),

('software-tip-linux-terminal-basics', 'SOFTWARE', 'Linux Terminal Basics: The 12 Commands You Need', 'Linux', 'All Linux', NULL, '/tips/green-code-laptop.jpg',
$tip$Open Terminal with Ctrl, Alt and T.

pwd: show which folder you're in
ls: list files (ls -la shows hidden files and details)
cd Documents: go into a folder (cd .. goes up one, cd alone goes home)
mkdir backup: make a folder
cp file.txt backup/: copy a file (cp -r for folders)
mv old.txt new.txt: move or rename
rm file.txt: delete a file permanently (there's no Recycle Bin in the terminal)
nano notes.txt: edit a text file (Ctrl and O to save, Ctrl and X to exit)
cat file.txt: show a file's contents
clear: clean the screen
man ls: the manual for any command (press Q to quit)
Up arrow: repeat earlier commands

Press Tab to finish file and folder names automatically.$tip$,
ARRAY['Terminal'], now() - interval '495 minutes'),

('software-tip-linux-sudo', 'SOFTWARE', 'What sudo Means and How to Use It Safely', 'Linux', 'All Linux', NULL, '/tips/code-dark.jpg',
$tip$sudo runs a command as the administrator (root), like "Run as administrator" on Windows.

1. Put sudo in front of commands that change the system: sudo apt install vlc
2. Enter your own password. Nothing appears while you type, that's normal.
3. sudo remembers your password for about 15 minutes.
4. Only users in the "sudo" group can use it. The first user created during install is in it.

Safety:
Never paste commands with sudo from websites or videos you don't trust.
Be extra careful with sudo rm, sudo dd and anything touching /dev/sda or /dev/nvme. One wrong letter can erase a whole drive.$tip$,
ARRAY['Terminal', 'sudo'], now() - interval '494 minutes'),

('software-tip-linux-permissions', 'SOFTWARE', 'Linux File Permissions Made Simple', 'Linux', 'All Linux', NULL, '/tips/code-screen.jpg',
$tip$1. See permissions: ls -l shows something like -rwxr-xr-- for each file.
r = read, w = write, x = execute (run). The three groups are: the owner, the group, everyone else.
2. Make a script runnable: chmod +x script.sh, then run it with ./script.sh
3. Common number settings: chmod 644 file (owner can edit, others read only), chmod 755 folder (owner full, others can open and read).
4. Change the owner: sudo chown username:username file
5. "Permission denied" on your own files copied from another disk? Fix the owner with chown, or copy them into your Home folder.

Avoid chmod 777. It lets anyone change or run the file.$tip$,
ARRAY['Terminal', 'chmod', 'chown'], now() - interval '493 minutes'),

('software-tip-linux-disk-space', 'SOFTWARE', 'Check and Free Disk Space on Linux', 'Linux', 'All Linux', NULL, '/tips/ssd-m2.jpg',
$tip$1. How full are the drives? df -h (look at the "Use%" column for /).
2. What's big in this folder? du -sh * | sort -h
3. Easier to read: install ncdu (sudo apt install ncdu) and run ncdu ~ to browse folder sizes.
4. Graphical: open Disk Usage Analyzer (Ubuntu) to see a chart of what uses space.
5. Free space:
sudo apt autoremove (removes old packages and kernels)
sudo apt clean (removes downloaded installer files)
Empty the Trash in the Files app.
6. Old snap versions on Ubuntu can use several GB. Remove unused apps from App Center.$tip$,
ARRAY['Terminal', 'Disk Usage Analyzer'], now() - interval '492 minutes'),

('software-tip-linux-system-info', 'SOFTWARE', 'Find a Linux PC''s Specs and Version', 'Linux', 'All Linux', NULL, '/tips/ram-cpus.jpg',
$tip$Open Terminal (Ctrl, Alt and T):

lsb_release -a: Linux version (for example Ubuntu 24.04 LTS)
uname -r: kernel version
lscpu: processor details
free -h: RAM total and used
lsblk: drives and partitions
lspci: graphics card, Wi-Fi and other internal parts
lsusb: USB devices plugged in

Everything in one report: sudo apt install inxi, then run inxi -Fxz

Graphical: Settings, then About (Ubuntu) or System Reports (Linux Mint).$tip$,
ARRAY['Terminal', 'inxi'], now() - interval '491 minutes'),

('software-tip-linux-processes', 'SOFTWARE', 'Close a Frozen App on Linux', 'Linux', 'All Linux', NULL, '/tips/code-laptop-dark.jpg',
$tip$1. Graphical: open System Monitor, find the app, right-click, then End or Kill.
2. Terminal: run top (or install htop: sudo apt install htop) to see what's using CPU and memory. Press Q to quit.
3. Close by name: killall firefox
4. Close by number: find the PID in top, then kill 1234. If it won't close: kill -9 1234
5. Whole desktop frozen? Press Ctrl, Alt and F3 to reach a text login, sign in, run top to find and kill the problem, then Ctrl, Alt and F2 (or F1) to go back. Or simply restart.$tip$,
ARRAY['System Monitor', 'top', 'htop'], now() - interval '490 minutes'),

('software-tip-linux-network-commands', 'SOFTWARE', 'Linux Network Commands for Fixing Internet Problems', 'Linux', 'All Linux', NULL, '/tips/ethernet-cable.jpg',
$tip$ip a: show network adapters and IP addresses
ping -c 4 8.8.8.8: test the internet connection (no reply means no internet)
ping -c 4 google.com: test that DNS works (if the first works but this fails, it's a DNS problem)
nmcli device wifi list: show Wi-Fi networks nearby
nmcli device wifi connect "Network Name" password "yourpassword": connect from the terminal
resolvectl status: show which DNS servers are used
sudo systemctl restart NetworkManager: restart networking

Wi-Fi not working at all after installing Linux? Check for a missing driver (see our Linux drivers tip), and use phone USB tethering to get online meanwhile.$tip$,
ARRAY['Terminal', 'nmcli', 'ping'], now() - interval '489 minutes'),

('software-tip-linux-rescue-windows-files', 'SOFTWARE', 'Rescue Files from a Dead Windows PC with a Linux USB', 'Linux', 'Ubuntu live USB', NULL, '/tips/man-fixing-laptop.jpg',
$tip$Windows won't start, but the files are still on the drive? A Linux live USB can copy them off.

1. Make an Ubuntu USB (see our Linux USB tip) and boot the broken PC from it. Choose "Try Ubuntu".
2. Plug in an external drive.
3. Open Files. The Windows drive appears on the left. Click it.
4. Copy the user's folders from Users, then their name: Desktop, Documents, Pictures, Downloads and Videos.
5. "Windows is hibernated" or "unsafe state" error? Windows was not shut down fully. The drive can still usually be opened read-only, which is enough for copying.
6. Drive encrypted with BitLocker? You'll need the recovery key (see our BitLocker tip).

If the drive makes clicking sounds or isn't detected, stop and bring it in, repeated attempts can make recovery harder.$tip$,
ARRAY['Ubuntu live USB', 'External drive'], now() - interval '488 minutes'),

('software-tip-linux-drive-health', 'SOFTWARE', 'Check Drive Health on Linux', 'Linux', 'All Linux', NULL, '/tips/ssd-m2.jpg',
$tip$1. Graphical: open the Disks app, choose the drive, click the three dots, then SMART Data and Self-Tests. It shows "Disk is OK" or warnings.
2. Terminal: install the tools with sudo apt install smartmontools
3. Find the drive name with lsblk (for example sda or nvme0n1).
4. Run: sudo smartctl -H /dev/sda (or /dev/nvme0n1). "PASSED" is good.
5. Full details: sudo smartctl -a /dev/sda. Watch "Reallocated_Sector_Ct" and "Current_Pending_Sector" on hard drives, and "Percentage Used" on SSDs.

Works from a live USB too, so you can check a Windows PC's drive without Windows.$tip$,
ARRAY['Disks', 'smartmontools'], now() - interval '487 minutes'),

('software-tip-linux-drivers', 'SOFTWARE', 'Install Missing Drivers on Ubuntu (Wi-Fi, Graphics)', 'Linux', 'Ubuntu, Linux Mint', NULL, '/tips/router-white.jpg',
$tip$Most drivers are built into Linux. A few (some Wi-Fi cards, NVIDIA graphics) need an extra step.

1. Connect to the internet with a cable or phone USB tethering.
2. Ubuntu: open Software and Updates, then the Additional Drivers tab. Choose the recommended driver and click Apply Changes. Linux Mint: open Driver Manager.
3. Terminal alternative: sudo ubuntu-drivers install
4. Restart.
5. Still missing? Find the exact chip with lspci (internal) or lsusb (USB), then search "<chip name> Ubuntu driver".

During install, tick "Install third-party software for graphics and Wi-Fi hardware" to get most drivers automatically.$tip$,
ARRAY['Additional Drivers', 'Driver Manager'], now() - interval '486 minutes'),

('software-tip-linux-fix-apt-errors', 'SOFTWARE', 'Fix "Could Not Get Lock" and Broken Package Errors', 'Linux', 'Ubuntu, Linux Mint', NULL, '/tips/code-dark.jpg',
$tip$1. "Could not get lock /var/lib/dpkg/lock": another update is already running, often the automatic updater. Wait a few minutes and try again. Don't delete the lock files while something is installing.
2. Install interrupted (power cut, closed terminal): run
sudo dpkg --configure -a
3. "Unmet dependencies" or broken packages:
sudo apt --fix-broken install
4. Then refresh everything:
sudo apt update
sudo apt upgrade
5. Still failing on one program? Note the package name in the error and remove it: sudo apt remove name, then try again.$tip$,
ARRAY['Terminal', 'apt', 'dpkg'], now() - interval '485 minutes'),

('software-tip-linux-users-passwords', 'SOFTWARE', 'Manage Users and Passwords on Linux', 'Linux', 'All Linux', NULL, '/tips/pointing-laptop.jpg',
$tip$1. Change your password: passwd
2. Add a user: sudo adduser john (follow the questions)
3. Give them admin rights: sudo usermod -aG sudo john
4. Change another user's password: sudo passwd john
5. Remove a user: sudo deluser john (add --remove-home to delete their files too)
6. See who's logged in: who

Graphical: Settings, then Users (Ubuntu) or Users and Groups (Linux Mint). Click Unlock first.

Give children and shared users normal accounts without sudo.$tip$,
ARRAY['Terminal', 'Users Settings'], now() - interval '484 minutes'),

('software-tip-linux-archives', 'SOFTWARE', 'Zip, Unzip and tar Files on Linux', 'Linux', 'All Linux', NULL, '/tips/usb-drive-hand.jpg',
$tip$Easy way: right-click files in the Files app, then Compress. Right-click an archive, then Extract Here.

Terminal:
zip -r photos.zip Photos: zip a folder
unzip photos.zip: unzip
tar -czf backup.tar.gz Documents: make a compressed .tar.gz
tar -xzf backup.tar.gz: extract a .tar.gz
tar -tzf backup.tar.gz: list what's inside without extracting

If zip or unzip are missing: sudo apt install zip unzip
For .rar and .7z files: sudo apt install unrar p7zip-full$tip$,
ARRAY['Files app', 'tar', 'zip'], now() - interval '483 minutes'),

('software-tip-linux-ssh', 'SOFTWARE', 'Connect to Another Computer with SSH', 'Linux', 'All Linux', NULL, '/tips/server-cables.jpg',
$tip$SSH lets you run commands on another computer over the network, securely.

1. On the computer you want to reach: sudo apt install openssh-server
2. Find its IP address: ip a (for example 192.168.1.20)
3. From another computer (Linux, Mac, or Windows Terminal): ssh username@192.168.1.20
4. Type yes the first time, then the user's password.
5. Safer and easier, use keys instead of passwords: run ssh-keygen on your computer, then ssh-copy-id username@192.168.1.20.
6. Copy files: scp file.txt username@192.168.1.20:/home/username/

Only open SSH to the internet if you know how to secure it (keys only, firewall).$tip$,
ARRAY['OpenSSH', 'Terminal'], now() - interval '482 minutes'),

('software-tip-linux-adb-fastboot', 'SOFTWARE', 'Use ADB and Fastboot on Linux', 'Linux', 'Ubuntu, Linux Mint', NULL, '/tips/laptop-and-phone.jpg',
$tip$Linux is great for phone work: no USB drivers to install.

1. Install: sudo apt install adb fastboot
2. Turn on USB debugging on the phone (see our USB debugging tip) and connect it.
3. Run: adb devices and accept the prompt on the phone.
4. Fastboot mode: fastboot devices
5. "No permissions" or device not listed: install the device rules with sudo apt install android-sdk-platform-tools-common, unplug and plug in the phone again. Running the command with sudo also works as a quick test.

All the commands from our ADB basics tip work the same on Linux.$tip$,
ARRAY['ADB', 'Fastboot', 'Terminal'], now() - interval '481 minutes'),

('software-tip-linux-firewall', 'SOFTWARE', 'Turn On the Firewall on Ubuntu (ufw)', 'Linux', 'Ubuntu, Linux Mint', NULL, '/tips/alert-message-2.jpg',
$tip$Ubuntu includes a simple firewall called ufw. It's off by default.

1. Turn it on: sudo ufw enable
2. Check it: sudo ufw status verbose
3. Allow a service you use from other computers, for example SSH: sudo ufw allow ssh
4. Remove a rule: sudo ufw delete allow ssh
5. Turn it off: sudo ufw disable

Graphical: install gufw (sudo apt install gufw) for an easy on and off switch. Linux Mint has Firewall Configuration in its menu.

Allow SSH before enabling ufw on a computer you manage remotely, or you'll lock yourself out.$tip$,
ARRAY['ufw', 'gufw'], now() - interval '480 minutes'),

('software-tip-linux-cron', 'SOFTWARE', 'Schedule Automatic Tasks on Linux with cron', 'Linux', 'All Linux', NULL, '/tips/code-screen.jpg',
$tip$cron runs commands automatically on a schedule, for example a nightly backup.

1. Edit your schedule: crontab -e (choose nano if asked).
2. Add a line in this format: minute hour day month weekday command
Examples:
0 2 * * * /home/user/backup.sh: every day at 2:00 AM
30 18 * * 5 /home/user/report.sh: every Friday at 6:30 PM
3. Save and exit (in nano: Ctrl and O, Enter, Ctrl and X).
4. See your schedule: crontab -l

Use full paths to scripts and programs, and make scripts executable with chmod +x.$tip$,
ARRAY['cron', 'Terminal'], now() - interval '479 minutes'),

('software-tip-linux-grub-repair', 'SOFTWARE', 'Fix a Missing Boot Menu (GRUB) After a Windows Update', 'Linux', 'Ubuntu dual boot', NULL, '/tips/broken-laptop-screen.jpg',
$tip$After a Windows update or reinstall, the PC may start straight into Windows and Ubuntu seems gone. Ubuntu is usually still there.

1. First try the BIOS boot menu (see our BIOS keys tip) and choose "ubuntu". If it starts, run sudo update-grub in Ubuntu.
2. Not listed? Boot from an Ubuntu USB and choose "Try Ubuntu".
3. Connect to the internet, open Terminal and run:
sudo add-apt-repository ppa:yannubuntu/boot-repair
sudo apt update
sudo apt install -y boot-repair
4. Open Boot Repair and click "Recommended repair". Follow its instructions.
5. Restart without the USB. The GRUB menu should be back.

Also turn off Fast Startup in Windows so it doesn't lock the shared drive.$tip$,
ARRAY['Boot Repair', 'Ubuntu live USB'], now() - interval '478 minutes'),

('software-tip-linux-reset-password', 'SOFTWARE', 'Forgot Your Ubuntu Password? Reset It', 'Linux', 'Ubuntu', NULL, '/tips/keyboard.jpg',
$tip$Only on your own computer. This doesn't work if the whole disk is encrypted.

1. Restart and hold Shift (or press Esc) to show the GRUB menu.
2. Choose "Advanced options for Ubuntu", then a line ending in "(recovery mode)".
3. Choose "root: Drop to root shell prompt" and press Enter.
4. Make the drive writable: mount -o remount,rw /
5. Set a new password: passwd yourusername (find the name with ls /home)
6. Type exit, then choose "resume" or run reboot.

Saved passwords in the keyring may ask for the old password once. Choose to create a new keyring.$tip$,
ARRAY['GRUB', 'Recovery mode'], now() - interval '477 minutes'),

('software-tip-linux-usb-ntfs', 'SOFTWARE', 'Open USB Drives and Windows Disks on Linux', 'Linux', 'All Linux', NULL, '/tips/usb-dongle-laptop.jpg',
$tip$1. Usually automatic: plug in the drive and it appears in the Files app. Click it to open.
2. Terminal: find it with lsblk (for example sdb1), then:
sudo mkdir -p /mnt/usb
sudo mount /dev/sdb1 /mnt/usb
3. Unplug safely: click the eject icon in Files, or sudo umount /mnt/usb
4. Windows (NTFS) disk opens read-only or shows "unsafe state"? Windows didn't fully shut down. Start Windows, choose Restart (not Shut down) or turn off Fast Startup, then try again.
5. exFAT and FAT32 USB drives work on both Windows and Linux, best for moving files between them.$tip$,
ARRAY['Files app', 'mount', 'lsblk'], now() - interval '476 minutes')
ON CONFLICT ("id") DO NOTHING;
