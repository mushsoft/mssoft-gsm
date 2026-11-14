-- One-time content update (no schema change): thumbnails for the Software
-- Tips, from free Pexels photos (Pexels licence: free for commercial use, no
-- attribution required), stored in public/tips at 1280x720.
-- Only fills empty thumbnails, so a photo uploaded in the admin is never
-- replaced.
--
-- Sources:
--   /tips/pointing-laptop.jpg  https://www.pexels.com/photo/3760367/
--   /tips/laptop-and-phone.jpg  https://www.pexels.com/photo/4549413/
--   /tips/samsung-lenses.jpg  https://www.pexels.com/photo/20348040/
--   /tips/iphone-charging-laptop.jpg  https://www.pexels.com/photo/18780712/
--   /tips/google-settings.jpg  https://www.pexels.com/photo/33453386/
--   /tips/usb-dongle-laptop.jpg  https://www.pexels.com/photo/7240348/
--   /tips/man-repairing-phone.jpg  https://www.pexels.com/photo/13625784/
--   /tips/repair-screwdriver.jpg  https://www.pexels.com/photo/6755075/
--   /tips/apps-screen.jpg  https://www.pexels.com/photo/9956762/
--   /tips/app-updates.jpg  https://www.pexels.com/photo/33041303/
--   /tips/usb-drive-hand.jpg  https://www.pexels.com/photo/5474288/
--   /tips/laptop-desk.jpg  https://www.pexels.com/photo/5710687/
--   /tips/broken-laptop-screen.jpg  https://www.pexels.com/photo/28379996/
--   /tips/man-fixing-laptop.jpg  https://www.pexels.com/photo/7639370/
--   /tips/ssd-m2.jpg  https://www.pexels.com/photo/5222605/
--   /tips/code-dark.jpg  https://www.pexels.com/photo/546819/
--   /tips/code-screen.jpg  https://www.pexels.com/photo/5223887/
--   /tips/phone-charger-table.jpg  https://www.pexels.com/photo/4195333/
--   /tips/charging-port.jpg  https://www.pexels.com/photo/4195332/
--   /tips/power-bank.jpg  https://www.pexels.com/photo/16814788/
--   /tips/sim-yellow.jpg  https://www.pexels.com/photo/14434414/
--   /tips/sim-ejector.jpg  https://www.pexels.com/photo/33277478/
--   /tips/router-yellow.jpg  https://www.pexels.com/photo/4218546/
--   /tips/router-white.jpg  https://www.pexels.com/photo/28348054/
--   /tips/earbuds-hand.jpg  https://www.pexels.com/photo/9130508/
--   /tips/earbuds-phone.jpg  https://www.pexels.com/photo/5081398/
--   /tips/iphone-hand.jpg  https://www.pexels.com/photo/19060160/
--   /tips/iphone-black-bg.jpg  https://www.pexels.com/photo/9995704/
--   /tips/alert-message.jpg  https://www.pexels.com/photo/7821766/
--   /tips/alert-message-2.jpg  https://www.pexels.com/photo/7821762/
--   /tips/child-phone.jpg  https://www.pexels.com/photo/7984354/
--   /tips/rear-camera.jpg  https://www.pexels.com/photo/10902916/
--   /tips/navigation-stand.jpg  https://www.pexels.com/photo/7738879/
--   /tips/keyboard-2.jpg  https://www.pexels.com/photo/4065712/
--   /tips/keyboard.jpg  https://www.pexels.com/photo/257879/
--   /tips/ram-cpus.jpg  https://www.pexels.com/photo/6373758/
--   /tips/photo-printer.jpg  https://www.pexels.com/photo/17536002/

UPDATE "RepairGuide" AS g
SET "thumbnail" = v.thumb
FROM (VALUES
  ('software-tip-windows-activation', '/tips/pointing-laptop.jpg'),
  ('software-tip-windows-forgot-password', '/tips/pointing-laptop.jpg'),
  ('software-tip-quick-assist', '/tips/pointing-laptop.jpg'),
  ('software-tip-windows-hello', '/tips/pointing-laptop.jpg'),
  ('software-tip-sp-flash-tool', '/tips/laptop-and-phone.jpg'),
  ('software-tip-mi-flash', '/tips/laptop-and-phone.jpg'),
  ('software-tip-qfil-qualcomm', '/tips/laptop-and-phone.jpg'),
  ('software-tip-phone-transfer-data', '/tips/laptop-and-phone.jpg'),
  ('software-tip-samsung-odin', '/tips/samsung-lenses.jpg'),
  ('software-tip-samsung-members-diagnostics', '/tips/samsung-lenses.jpg'),
  ('software-tip-samsung-test-codes', '/tips/samsung-lenses.jpg'),
  ('software-tip-backup-before-flash', '/tips/iphone-charging-laptop.jpg'),
  ('software-tip-iphone-backup', '/tips/iphone-charging-laptop.jpg'),
  ('software-tip-android-to-iphone', '/tips/iphone-charging-laptop.jpg'),
  ('software-tip-phone-pc-file-transfer', '/tips/iphone-charging-laptop.jpg'),
  ('software-tip-frp-right-way', '/tips/google-settings.jpg'),
  ('software-tip-find-my-device', '/tips/google-settings.jpg'),
  ('software-tip-usb-drivers', '/tips/usb-dongle-laptop.jpg'),
  ('software-tip-usb-not-recognized', '/tips/usb-dongle-laptop.jpg'),
  ('software-tip-huawei-hisuite', '/tips/usb-dongle-laptop.jpg'),
  ('software-tip-boot-modes', '/tips/man-repairing-phone.jpg'),
  ('software-tip-phone-before-sale-repair', '/tips/man-repairing-phone.jpg'),
  ('software-tip-choose-right-firmware', '/tips/man-repairing-phone.jpg'),
  ('software-tip-samsung-maintenance-mode', '/tips/man-repairing-phone.jpg'),
  ('software-tip-fix-bootloop', '/tips/repair-screwdriver.jpg'),
  ('software-tip-android-random-restarts', '/tips/repair-screwdriver.jpg'),
  ('software-tip-android-touch-problems', '/tips/repair-screwdriver.jpg'),
  ('software-tip-safe-mode', '/tips/apps-screen.jpg'),
  ('software-tip-android-notifications', '/tips/apps-screen.jpg'),
  ('software-tip-android-apps-crashing', '/tips/apps-screen.jpg'),
  ('software-tip-speed-up-old-phone', '/tips/apps-screen.jpg'),
  ('software-tip-safe-update', '/tips/app-updates.jpg'),
  ('software-tip-android-play-store', '/tips/app-updates.jpg'),
  ('software-tip-whatsapp-backup-restore', '/tips/app-updates.jpg'),
  ('software-tip-windows-bootable-usb', '/tips/usb-drive-hand.jpg'),
  ('software-tip-usb-write-protected', '/tips/usb-drive-hand.jpg'),
  ('software-tip-windows-backup-files', '/tips/usb-drive-hand.jpg'),
  ('software-tip-windows-clean-install', '/tips/laptop-desk.jpg'),
  ('software-tip-new-laptop-setup', '/tips/laptop-desk.jpg'),
  ('software-tip-windows10-end-of-support', '/tips/laptop-desk.jpg'),
  ('software-tip-install-office', '/tips/laptop-desk.jpg'),
  ('software-tip-windows-wont-boot', '/tips/broken-laptop-screen.jpg'),
  ('software-tip-screen-flickering', '/tips/broken-laptop-screen.jpg'),
  ('software-tip-windows-blue-screen', '/tips/broken-laptop-screen.jpg'),
  ('software-tip-laptop-overheating', '/tips/man-fixing-laptop.jpg'),
  ('software-tip-windows-drivers', '/tips/man-fixing-laptop.jpg'),
  ('software-tip-boot-device-not-found', '/tips/man-fixing-laptop.jpg'),
  ('software-tip-laptop-battery-report', '/tips/man-fixing-laptop.jpg'),
  ('software-tip-windows-speed-up', '/tips/ssd-m2.jpg'),
  ('software-tip-windows-drive-health', '/tips/ssd-m2.jpg'),
  ('software-tip-extend-c-drive', '/tips/ssd-m2.jpg'),
  ('software-tip-recover-deleted-files-windows', '/tips/ssd-m2.jpg'),
  ('software-tip-adb-basics', '/tips/code-dark.jpg'),
  ('software-tip-windows-update-stuck', '/tips/code-dark.jpg'),
  ('software-tip-microsoft-store-fix', '/tips/code-dark.jpg'),
  ('software-tip-xiaomi-bootloader-unlock', '/tips/code-dark.jpg'),
  ('software-tip-android-usb-debugging', '/tips/code-screen.jpg'),
  ('software-tip-windows-restore-point', '/tips/code-screen.jpg'),
  ('software-tip-fast-startup', '/tips/code-screen.jpg'),
  ('software-tip-windows-reset-pc', '/tips/code-screen.jpg'),
  ('software-tip-iphone-battery-health', '/tips/phone-charger-table.jpg'),
  ('software-tip-android-battery-health', '/tips/phone-charger-table.jpg'),
  ('software-tip-android-not-charging', '/tips/charging-port.jpg'),
  ('software-tip-android-overheating', '/tips/charging-port.jpg'),
  ('software-tip-android-battery-drain', '/tips/power-bank.jpg'),
  ('software-tip-phone-hotspot', '/tips/power-bank.jpg'),
  ('software-tip-android-sim-not-detected', '/tips/sim-yellow.jpg'),
  ('software-tip-phone-storage-full', '/tips/sim-yellow.jpg'),
  ('software-tip-calls-dropping-volte', '/tips/sim-ejector.jpg'),
  ('software-tip-phone-network-fix', '/tips/sim-ejector.jpg'),
  ('software-tip-phone-model-specs', '/tips/sim-ejector.jpg'),
  ('software-tip-windows-no-internet', '/tips/router-yellow.jpg'),
  ('software-tip-wifi-adapter-missing', '/tips/router-white.jpg'),
  ('software-tip-android-bluetooth', '/tips/earbuds-hand.jpg'),
  ('software-tip-android-no-sound', '/tips/earbuds-hand.jpg'),
  ('software-tip-windows-no-sound', '/tips/earbuds-phone.jpg'),
  ('software-tip-iphone-force-restart', '/tips/iphone-hand.jpg'),
  ('software-tip-iphone-recovery-mode', '/tips/iphone-hand.jpg'),
  ('software-tip-iphone-storage', '/tips/iphone-hand.jpg'),
  ('software-tip-iphone-activation-lock', '/tips/iphone-black-bg.jpg'),
  ('software-tip-iphone-unavailable', '/tips/iphone-black-bg.jpg'),
  ('software-tip-mobile-money-scams', '/tips/alert-message.jpg'),
  ('software-tip-android-adware', '/tips/alert-message.jpg'),
  ('software-tip-ransomware-protection', '/tips/alert-message-2.jpg'),
  ('software-tip-browser-hijack', '/tips/alert-message-2.jpg'),
  ('software-tip-windows-defender-offline', '/tips/alert-message-2.jpg'),
  ('software-tip-family-link', '/tips/child-phone.jpg'),
  ('software-tip-phone-camera-not-working', '/tips/rear-camera.jpg'),
  ('software-tip-recover-deleted-photos', '/tips/rear-camera.jpg'),
  ('software-tip-screenshot-screen-record', '/tips/rear-camera.jpg'),
  ('software-tip-phone-gps-location', '/tips/navigation-stand.jpg'),
  ('software-tip-windows-shortcuts', '/tips/keyboard-2.jpg'),
  ('software-tip-laptop-keyboard-touchpad', '/tips/keyboard-2.jpg'),
  ('software-tip-bios-boot-keys', '/tips/keyboard-2.jpg'),
  ('software-tip-check-pc-specs', '/tips/keyboard.jpg'),
  ('software-tip-slow-browser', '/tips/keyboard.jpg'),
  ('software-tip-windows-disk-space', '/tips/keyboard.jpg'),
  ('software-tip-windows-memory-test', '/tips/ram-cpus.jpg'),
  ('software-tip-windows11-tpm-secure-boot', '/tips/ram-cpus.jpg'),
  ('software-tip-printer-not-printing', '/tips/photo-printer.jpg')
) AS v(id, thumb)
WHERE g."id" = v.id AND g."thumbnail" = '';
