-- One-time content load (no schema change): 25 hardware tips on speakers, headphones, memory cards, flash drives, controllers and cases,
-- each with its own photo from public/tips (free Pexels photos).
-- Fixed ids + ON CONFLICT DO NOTHING: added once, admin edits never overwritten.

INSERT INTO "RepairGuide" ("id", "category", "title", "brand", "modelName", "videoUrl", "thumbnail", "content", "toolsUsed", "createdAt") VALUES
('hardware-tip-bluetooth-speaker-wont-pair', 'HARDWARE', 'Bluetooth Speaker Won''t Pair', 'All brands', '', NULL, '/tips/hw-bluetooth-speaker-wont-pair.jpg',
$tip$Most pairing problems are fixed without opening anything.

1. Charge the speaker. Many won't pair on a low battery.
2. Put it in pairing mode: usually hold the Bluetooth button until the light flashes fast.
3. On the phone, forget the speaker in Bluetooth settings, then search again.
4. Turn off Bluetooth on other phones and laptops nearby that remember the speaker. It may be connecting to them instead.
5. Restart the phone.
6. Reset the speaker to factory settings (check the button combination in its manual).

If it pairs with other phones but not yours, the problem is on the phone. Reset its network settings.$tip$,
ARRAY[]::text[], now() - interval '2 minutes'),

('hardware-tip-bluetooth-speaker-not-charging', 'HARDWARE', 'Bluetooth Speaker Not Charging', 'All brands', '', NULL, '/tips/hw-bluetooth-speaker-not-charging.jpg',
$tip$When a speaker won't charge, start with the cable and port.

1. Try another cable and a 5V wall charger. Some speakers don't charge from fast chargers or laptops.
2. Clean the charging port gently with a wooden toothpick.
3. Many speakers have a rubber flap over the port. Make sure it isn't blocking the plug.
4. Leave a fully flat speaker charging for an hour before giving up.
5. If the charging light flashes in an odd pattern, check the manual: it may be a battery warning.
6. A loose or wobbly port needs replacing. A battery that won't hold charge needs replacing too.

Most speakers can be opened, and their batteries and ports replaced, by a technician.$tip$,
ARRAY['Wooden toothpick', 'Known good cable'], now() - interval '4 minutes'),

('hardware-tip-bluetooth-speaker-got-wet', 'HARDWARE', 'Bluetooth Speaker Got Wet: What to Do', 'All brands', '', NULL, '/tips/hw-bluetooth-speaker-got-wet.jpg',
$tip$Many speakers are splash proof, but water still causes trouble, especially in the port.

1. Switch it off and don't charge it.
2. Dry the outside and shake water out of the grille gently.
3. Open the port flap and leave it to dry in an airy place for a day, port facing down.
4. Don't use a hair dryer on high heat.
5. Only charge it when the port is completely dry. Charging a wet port causes corrosion.
6. If sound is muffled, play a low bass sound at low volume to push water out of the speaker.

Speakers that aren't water rated and were dropped in water need opening and cleaning like a phone.$tip$,
ARRAY['Dry cloth'], now() - interval '6 minutes'),

('hardware-tip-bluetooth-speaker-crackling', 'HARDWARE', 'Bluetooth Speaker Sound Crackling', 'All brands', '', NULL, '/tips/hw-bluetooth-speaker-crackling.jpg',
$tip$Crackling sound can come from the connection or from the speaker itself.

1. Move the phone closer. Distance and walls cause crackles and dropouts.
2. Play music stored on the phone to rule out a slow internet stream.
3. Lower the phone's volume a little and raise the speaker's. Max volume on both can distort.
4. Turn off the phone's equaliser and bass boost.
5. Try a cable (AUX) if the speaker has one. If the cable also crackles, the speaker driver is damaged.
6. Check the grille for sand or metal bits stuck to the magnet.

A torn speaker cone usually needs a replacement driver.$tip$,
ARRAY[]::text[], now() - interval '8 minutes'),

('hardware-tip-bluetooth-speaker-battery-care', 'HARDWARE', 'Bluetooth Speaker Battery Care', 'All brands', '', NULL, '/tips/hw-bluetooth-speaker-battery-care.jpg',
$tip$Speaker batteries wear like phone batteries. A little care makes them last years.

1. Charge it every month or two even if you don't use it. A battery left empty for long may never charge again.
2. Store it about half charged.
3. Avoid leaving it in a hot car or full sun.
4. Don't play at full volume all the time: it drains the battery fast and heats it.
5. Use a normal 5V charger unless the maker says fast charging is supported.

If battery life is very short or the case is bulging, the battery needs replacing.$tip$,
ARRAY[]::text[], now() - interval '10 minutes'),

('hardware-tip-choosing-bluetooth-speaker', 'HARDWARE', 'Choosing a Bluetooth Speaker: Watts, Battery and Water Rating', 'All brands', '', NULL, '/tips/hw-choosing-bluetooth-speaker.jpg',
$tip$What to look for when buying a speaker:

1. Watts: more watts means louder. 5 to 10W for a room, 20W or more for outdoors and events.
2. Battery: look for real hours of playtime from reviews, not only the box.
3. Water rating: IPX4 survives splashes, IPX7 survives being dropped in water.
4. Charging port: USB-C is easier to find cables for.
5. Extras: AUX input, memory card or USB music, FM radio, or pairing two speakers.
6. Brand and warranty: copies of popular brands often sound weak and their batteries swell.

Test it in the shop at medium and high volume before paying.$tip$,
ARRAY[]::text[], now() - interval '12 minutes'),

('hardware-tip-pairing-two-bluetooth-speakers', 'HARDWARE', 'Pairing Two Bluetooth Speakers Together', 'All brands', '', NULL, '/tips/hw-pairing-two-bluetooth-speakers.jpg',
$tip$Some speakers can play together for bigger sound or stereo.

1. Check both speakers support it. Usually they must be the same brand and series (for example "PartyBoost", "TWS" or "Party Mode").
2. Connect the phone to the first speaker.
3. Press the link or TWS button on both speakers as the manual says.
4. The second speaker joins the first. Some can be set to left and right for stereo.
5. Keep both close to each other and the phone at first.

Two different brands usually can't pair together, but some phones can send sound to two Bluetooth devices at once.$tip$,
ARRAY[]::text[], now() - interval '14 minutes'),

('hardware-tip-bluetooth-speakers-outdoors', 'HARDWARE', 'Bluetooth Speakers Outdoors: Heat, Dust and Sun', 'All brands', '', NULL, '/tips/hw-bluetooth-speakers-outdoors.jpg',
$tip$Speakers used at events, shops and outdoors face harsh conditions.

1. Keep them in the shade. Full sun overheats the battery and fades the case.
2. Brush dust and sand off the grille after use.
3. Close the port flap to keep dust out.
4. Don't leave them outside overnight: dew gets inside.
5. Carry them in a bag to avoid drops on hard ground.
6. Keep them away from cooking smoke and oil.

A speaker that gets very hot while playing loud should be given a break to cool down.$tip$,
ARRAY['Soft brush'], now() - interval '16 minutes'),

('hardware-tip-bluetooth-speaker-range-dropouts', 'HARDWARE', 'Bluetooth Speaker Range and Dropouts', 'All brands', '', NULL, '/tips/hw-bluetooth-speaker-range-dropouts.jpg',
$tip$Bluetooth reaches about 10 metres in open space, much less through walls and bodies.

1. Keep a clear line between the phone and the speaker.
2. Don't keep the phone in a back pocket while dancing: your body blocks the signal.
3. Move away from microwaves, Wi-Fi routers and many other Bluetooth devices.
4. Close apps that also use Bluetooth, like smartwatch apps, if the sound keeps cutting.
5. Update the phone and the speaker if possible.

For long distances, put the phone near the speaker and control music from there.$tip$,
ARRAY[]::text[], now() - interval '18 minutes'),

('hardware-tip-bluetooth-speaker-for-calls', 'HARDWARE', 'Using a Bluetooth Speaker for Calls', 'All brands', '', NULL, '/tips/hw-bluetooth-speaker-for-calls.jpg',
$tip$Many speakers have a microphone for hands free calls.

1. Check the speaker has a microphone (look for a small hole or a call button).
2. In Bluetooth settings on the phone, turn on "phone calls" for the speaker.
3. Speak towards the speaker from close by.
4. Lower the volume a little to avoid echo for the caller.
5. If callers hear an echo or you can't be heard, switch the call back to the phone.

Speakers without a microphone will play the caller, but the phone's own microphone picks up your voice.$tip$,
ARRAY[]::text[], now() - interval '20 minutes'),

('hardware-tip-headphone-ear-pads', 'HARDWARE', 'Headphone Ear Pads: Replace Worn Cushions', 'All brands', '', NULL, '/tips/hw-headphone-ear-pads.jpg',
$tip$Ear pads crack and peel with sweat and age. New pads make headphones comfortable and sound better.

1. Find the headphone model, usually printed inside the headband.
2. Buy pads made for that model, or the right size (measure the old pad).
3. Most pads twist off or pull off from a clip ring. Some are glued.
4. Fit the new pad's lip around the ring all the way round.
5. Clean the headphones' ear cups before fitting.

Worn pads let bass leak out, so the sound improves too.$tip$,
ARRAY['Replacement ear pads'], now() - interval '22 minutes'),

('hardware-tip-wireless-headphones-not-charging', 'HARDWARE', 'Wireless Headphones Not Charging', 'All brands', '', NULL, '/tips/hw-wireless-headphones-not-charging.jpg',
$tip$Like speakers, most wireless headphone charging faults are the cable, port or a deeply flat battery.

1. Try another cable and a 5V wall charger.
2. Clean lint from the port with a wooden toothpick.
3. Leave it charging for an hour if it was empty for a long time.
4. Reset the headphones as the manual says.
5. Check the charging light. No light at all with good cables points to the port or battery.

The battery inside most headphones can be replaced by a technician.$tip$,
ARRAY['Wooden toothpick', 'Known good cable'], now() - interval '24 minutes'),

('hardware-tip-headphones-cable-crackling', 'HARDWARE', 'Headphones Cable Crackling', 'All brands', '', NULL, '/tips/hw-headphones-cable-crackling.jpg',
$tip$Crackling when you move the cable means a broken wire or dirty plug.

1. Clean the plug with a dry cloth and the phone's jack with a wooden toothpick.
2. Wiggle the cable near the plug and near the headphones to find where it crackles.
3. If the cable is removable, try another cable. Many over-ear headphones use a standard cable.
4. If it is fixed, a technician can cut out the broken part and solder a new plug.
5. Use a cable clip so the cable doesn't bend sharply at the plug.

Good headphones are worth repairing. Cheap ones are usually replaced.$tip$,
ARRAY['Another cable', 'Soldering iron (for repairs)'], now() - interval '26 minutes'),

('hardware-tip-over-ear-headphones-care', 'HARDWARE', 'Over-Ear Headphones Care', 'All brands', '', NULL, '/tips/hw-over-ear-headphones-care.jpg',
$tip$Good headphones can last many years.

1. Store them in a case or on a stand, not thrown in a bag.
2. Don't hang them by the cable.
3. Wipe the pads after use, especially in hot weather.
4. Don't twist or over stretch the headband.
5. Keep them out of the sun, which cracks the pads.
6. Unplug by the plug, not the cable.

Turning the volume down protects your ears and the drivers.$tip$,
ARRAY['Soft cloth', 'Case'], now() - interval '28 minutes'),

('hardware-tip-choosing-headphones-calls-music', 'HARDWARE', 'Choosing Headphones for Calls and Music', 'All brands', '', NULL, '/tips/hw-choosing-headphones-calls-music.jpg',
$tip$Different uses need different headphones.

1. For calls and online meetings: a good microphone matters more than bass. Look for a headset with a boom mic or noise cancelling mics.
2. For music at home: over-ear headphones sound fuller and are comfortable for long use.
3. For travel and noisy places: active noise cancelling helps a lot.
4. For sport: in-ear earbuds with ear hooks stay in place.
5. Wired or wireless: wired has no battery to wear out and no delay. Wireless is more convenient.

Try them on before buying if you can.$tip$,
ARRAY[]::text[], now() - interval '30 minutes'),

('hardware-tip-memory-card-types-speed', 'HARDWARE', 'Memory Card Types Explained: SD, microSD and Speed Classes', 'All brands', '', NULL, '/tips/hw-memory-card-types-speed.jpg',
$tip$Memory cards come in different sizes and speeds. The wrong one can be slow or not work.

Sizes:
1. microSD: for phones, tablets, dashcams and many cameras.
2. SD: for cameras and laptops. A microSD can fit an SD slot with an adapter.

Capacity types:
1. SDHC: up to 32GB.
2. SDXC: 64GB to 2TB. Older devices may not support SDXC.

Speed marks:
1. Class 10 or U1: fine for photos and normal video.
2. U3 or V30: for 4K video and fast cameras.
3. A1 or A2: better for running apps from the card on phones.

Check the device's maximum supported card size before buying.$tip$,
ARRAY[]::text[], now() - interval '32 minutes'),

('hardware-tip-fake-memory-cards', 'HARDWARE', 'Fake Memory Cards: Check the Real Capacity', 'All brands', '', NULL, '/tips/hw-fake-memory-cards.jpg',
$tip$Fake cards show a big capacity (like 512GB) but really hold much less. Files above the real size are lost.

Warning signs:
1. Price far too low for the capacity.
2. Poor printing or unknown brand.
3. Photos and videos turn grey or corrupted after the card fills up.

How to check:
1. On a computer, run a card test tool that writes and reads the whole card (such as H2testw or F3).
2. The test shows the real capacity and any errors.
3. Return fake cards to the seller.

Buy cards from trusted shops. Your photos are worth more than the card.$tip$,
ARRAY['Card test software', 'Card reader'], now() - interval '34 minutes'),

('hardware-tip-phone-not-reading-memory-card', 'HARDWARE', 'Phone Not Reading the Memory Card', 'All brands', '', NULL, '/tips/hw-phone-not-reading-memory-card.jpg',
$tip$If the phone says no card or card damaged:

1. Switch off, remove the card, wipe its gold contacts and put it back properly in the tray.
2. Check the tray is the right one and the card sits in the memory card position, not the SIM.
3. Try the card in another phone or a card reader on a computer.
4. If the computer reads it, back up the files, then format the card in the phone.
5. If nothing reads it, the card is probably dead.
6. If other cards also fail in the phone, the phone's card reader may be faulty.

Very large cards may not work in older phones. Check the phone's maximum card size.$tip$,
ARRAY['Card reader', 'Dry cloth'], now() - interval '36 minutes'),

('hardware-tip-memory-card-corrupted-recovery', 'HARDWARE', 'Memory Card Corrupted: Recover Photos Safely', 'All brands', '', NULL, '/tips/hw-memory-card-corrupted-recovery.jpg',
$tip$When a card says it is corrupted, don't format it if the files matter.

1. Stop using the card straight away. New files can overwrite lost ones.
2. Don't accept "format card" prompts on the phone or computer.
3. Put the card in a card reader on a computer.
4. Use photo recovery software to scan the card and save recovered files to the computer, never back to the card.
5. After recovering, format the card and test it before trusting it again, or replace it.

Back up photos regularly to a computer or cloud. Memory cards can fail without warning.$tip$,
ARRAY['Card reader', 'Recovery software'], now() - interval '38 minutes'),

('hardware-tip-choosing-memory-card', 'HARDWARE', 'Choosing a Memory Card for a Phone or Dashcam', 'All brands', '', NULL, '/tips/hw-choosing-memory-card.jpg',
$tip$Choose the card for the job.

1. Phones: a known brand microSD, A1 or A2 class, in the size your phone supports.
2. Dashcams and CCTV: "high endurance" cards made for constant recording. Normal cards wear out fast with nonstop video.
3. Cameras: U3 or V30 cards for 4K video.
4. Size: 64GB or 128GB is plenty for most phones. Check the device's limit.

Buy from trusted shops: fake cards are very common.$tip$,
ARRAY[]::text[], now() - interval '40 minutes'),

('hardware-tip-memory-cards-cctv-dashcam-wear', 'HARDWARE', 'Memory Cards for CCTV and Dashcams: Why They Wear Out', 'All brands', '', NULL, '/tips/hw-memory-cards-cctv-dashcam-wear.jpg',
$tip$Cameras that record all day write to the card nonstop. Normal cards wear out within months.

1. Use "high endurance" or "video monitoring" cards, made for constant recording.
2. Format the card in the camera every month or two.
3. Check footage now and then to make sure it is still recording.
4. Replace the card every year or two, or sooner if errors appear.
5. Keep the camera out of direct sun. Heat shortens card life.

A camera with a dead card records nothing, and you only find out when you need the footage.$tip$,
ARRAY[]::text[], now() - interval '42 minutes'),

('hardware-tip-flash-drive-not-showing', 'HARDWARE', 'Flash Drive Not Showing on Windows', 'All brands', '', NULL, '/tips/hw-flash-drive-not-showing.jpg',
$tip$If a flash drive doesn't appear:

1. Try another USB port, preferably directly on the computer, not a hub.
2. Try another computer.
3. Open Disk Management. If the drive shows there without a letter, assign one.
4. If it shows as "unallocated" or "RAW", the files may be damaged. Use recovery software before formatting if the files matter.
5. Update USB drivers in Device Manager.
6. If no computer detects it at all, the drive is likely dead.

Always eject a flash drive before pulling it out.$tip$,
ARRAY['Another computer'], now() - interval '44 minutes'),

('hardware-tip-fake-flash-drives', 'HARDWARE', 'Fake Flash Drives: Check the Real Capacity', 'All brands', '', NULL, '/tips/hw-fake-flash-drives.jpg',
$tip$Like memory cards, many cheap flash drives claim a huge capacity they don't have.

1. Be wary of 1TB or 2TB flash drives at very low prices.
2. Test new drives with software that writes and reads the whole drive (such as H2testw).
3. Fake drives seem to work, but files over the real size are corrupted.
4. Return fake drives and buy from trusted shops.

Never keep your only copy of important files on a flash drive.$tip$,
ARRAY['Test software'], now() - interval '46 minutes'),

('hardware-tip-safely-removing-flash-drive', 'HARDWARE', 'Safely Removing a Flash Drive', 'All brands', '', NULL, '/tips/hw-safely-removing-flash-drive.jpg',
$tip$Pulling a flash drive out while files are copying can corrupt them, or the whole drive.

1. Wait for copying to finish.
2. Click "Safely remove" or "Eject" before pulling it out.
3. On a phone with OTG, eject it in storage settings.
4. Don't use the drive while the computer is going to sleep.
5. Keep the cap on to protect the plug.

If a drive gets corrupted, use recovery software before formatting.$tip$,
ARRAY[]::text[], now() - interval '48 minutes'),

('hardware-tip-game-controller-drift', 'HARDWARE', 'Game Controller Drift: Causes and Fixes', 'All brands', '', NULL, '/tips/hw-game-controller-drift.jpg',
$tip$Drift is when the character or camera moves without touching the stick.

1. Recalibrate the controller in the console or PC settings.
2. Update the controller's firmware.
3. Blow around the stick base to clear dust.
4. A technician can open the controller and clean the stick sensor with a little isopropyl alcohol.
5. If drift returns, the joystick module is worn and needs replacing (soldering work).

Drift is very common after a year or two of heavy gaming. Replacing the stick is cheaper than a new controller.$tip$,
ARRAY['Screwdriver set', 'Isopropyl alcohol', 'Replacement joystick module'], now() - interval '50 minutes')
ON CONFLICT ("id") DO NOTHING;
