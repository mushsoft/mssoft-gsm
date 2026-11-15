-- One-time content load (no schema change): 24 hardware tips on phone parts and screens,
-- each with its own photo from public/tips (free Pexels photos).
-- Fixed ids + ON CONFLICT DO NOTHING: added once, admin edits never overwritten.

INSERT INTO "RepairGuide" ("id", "category", "title", "brand", "modelName", "videoUrl", "thumbnail", "content", "toolsUsed", "createdAt") VALUES
('hardware-tip-bluetooth-earbuds-disconnecting', 'HARDWARE', 'Bluetooth Earbuds Disconnecting or Lagging', 'All brands', '', NULL, '/tips/hw-bluetooth-earbuds-disconnecting.jpg',
$tip$Dropouts and delayed sound are usually caused by distance, interference or old pairings.

1. Keep the phone close, ideally on the same side of your body as the earbuds.
2. Turn off Bluetooth on other devices nearby that remember the earbuds, like a laptop or tablet.
3. Forget the earbuds in Bluetooth settings and pair them again.
4. Update the earbuds through their app if they have one.
5. Charge them: low battery causes dropouts.
6. For videos and games, turn on the low latency or gaming mode if the earbuds offer it.

Crowded places with many phones and Wi-Fi networks cause more dropouts. It isn't always a fault.$tip$,
ARRAY[]::text[], now() - interval '52 minutes'),

('hardware-tip-spotting-fake-earbuds', 'HARDWARE', 'Spotting Fake AirPods and Earbuds', 'All brands', '', NULL, '/tips/hw-spotting-fake-earbuds.jpg',
$tip$Copy earbuds look almost the same as the real ones but sound worse and their batteries die quickly.

Signs of fakes:
1. A price far below the normal price.
2. Poor print on the box, missing serial number or a serial that doesn't check out on the maker's website.
3. The case lid feels loose or the magnets are weak.
4. On iPhones, real AirPods show a popup with the battery level and appear in Find My. Many fakes don't, or show the wrong details.
5. Noise cancelling and spatial audio missing or poor.

Buy from trusted shops with a receipt and warranty. Fake earbuds can't be repaired or replaced under warranty.$tip$,
ARRAY[]::text[], now() - interval '54 minutes'),

('hardware-tip-earbuds-battery-life-shorter', 'HARDWARE', 'Earbuds Battery Life Getting Shorter', 'All brands', '', NULL, '/tips/hw-earbuds-battery-life-shorter.jpg',
$tip$Earbud batteries are tiny and wear out after about two to three years of daily use.

To make them last:
1. Keep them in the case when not in use, but don't leave the case flat for weeks.
2. Avoid heat: car dashboards and direct sun damage the batteries quickly.
3. Turn off noise cancelling when you don't need it.
4. Lower the volume a little. It saves battery and your ears.
5. Update the earbuds' software.

When battery life is very short, the batteries are usually worn out. Most earbuds can't have their batteries replaced, so check your warranty first.$tip$,
ARRAY[]::text[], now() - interval '56 minutes'),

('hardware-tip-wired-earphones-last-longer', 'HARDWARE', 'Make Wired Earphones Last Longer', 'All brands', '', NULL, '/tips/hw-wired-earphones-last-longer.jpg',
$tip$Wired earphones break where the cable bends most.

1. Pull the plug, not the cable, when unplugging.
2. Wind them loosely in loops, not tightly around your phone.
3. Don't sit on them or leave them in a back pocket.
4. Keep the plug clean and dry.
5. A small case stops tangles and broken wires.

If sound cuts in and out when you move the cable, a wire has broken inside. Cheap sets are best replaced.$tip$,
ARRAY[]::text[], now() - interval '58 minutes'),

('hardware-tip-headset-microphone-not-working', 'HARDWARE', 'Headset Microphone Not Working on Calls', 'All brands', '', NULL, '/tips/hw-headset-microphone-not-working.jpg',
$tip$When callers can't hear you on your earbuds or headset, check settings before buying new ones.

1. Make a call without the headset. If it works, the problem is the headset or its connection.
2. Clean the microphone hole on the earbud or cable with a dry soft brush.
3. For Bluetooth, make sure "phone calls" or "call audio" is switched on for the device in Bluetooth settings.
4. Remove other paired devices that may take over the call.
5. For wired headsets, check the plug is pushed all the way in. Thick phone cases can stop it.
6. Some headsets only support music, not the microphone, on certain phones.

Test the headset on another phone to confirm before replacing it.$tip$,
ARRAY[]::text[], now() - interval '60 minutes'),

('hardware-tip-smartwatch-not-charging', 'HARDWARE', 'Smartwatch Not Charging: Pins and Cradle', 'All brands', '', NULL, '/tips/hw-smartwatch-not-charging.jpg',
$tip$Most smartwatch charging problems come from dirty contacts or a poorly seated charger.

1. Clean the metal pins or charging area on the back of the watch with a cotton bud and a little isopropyl alcohol.
2. Clean the charger's pins too. Sweat leaves a layer that blocks charging.
3. Check the watch sits properly on the magnetic charger and the strap isn't lifting it.
4. Use the original charger and a good USB adapter.
5. Let a fully flat watch charge for 30 minutes.
6. Restart the watch.

Green or black marks on the pins are corrosion from sweat. Clean the back after workouts.$tip$,
ARRAY['Cotton bud', 'Isopropyl alcohol'], now() - interval '62 minutes'),

('hardware-tip-smartwatch-sweat-water-straps', 'HARDWARE', 'Smartwatch Care: Sweat, Water and Straps', 'All brands', '', NULL, '/tips/hw-smartwatch-sweat-water-straps.jpg',
$tip$A smartwatch faces sweat, rain and knocks every day.

1. Rinse sweat off after exercise with fresh water if the watch is water resistant, then dry it.
2. Don't wear it in hot showers or saunas, even if it is water resistant.
3. Avoid soap, sunscreen and sea water on the seals.
4. Clean the sensors on the back so heart rate readings stay accurate.
5. Wash silicone straps and let leather straps dry naturally.
6. Fit a screen protector or bumper if you work with your hands.

A cracked watch screen lets water in quickly, so repair it early.$tip$,
ARRAY['Soft cloth', 'Mild soap'], now() - interval '64 minutes'),

('hardware-tip-replacing-camera-lens-glass', 'HARDWARE', 'Replacing a Cracked Camera Lens Glass', 'All brands', '', NULL, '/tips/hw-replacing-camera-lens-glass.jpg',
$tip$A cracked camera lens cover makes photos hazy and lets dust and water in. Replacing just the lens glass is quick and cheap on most phones.

1. Cover the cracked lens with tape so pieces don't fall into the camera.
2. Warm the area gently to soften the glue.
3. Lift the broken glass out with a fine plastic or metal pick, working from the edge. Don't press on the camera underneath.
4. Clean all glass bits and old glue from the ring.
5. Fit the new lens with its adhesive and press it down evenly.
6. Test photos at different distances and with the flash.

If photos are still blurry after a new lens, the camera module itself may be damaged.$tip$,
ARRAY['Heat gun', 'Fine pick', 'Adhesive', 'Tape'], now() - interval '66 minutes'),

('hardware-tip-camera-black-screen', 'HARDWARE', 'Camera App Opens but Shows Only Black', 'All brands', '', NULL, '/tips/hw-camera-black-screen.jpg',
$tip$If the camera app opens but shows black, check software first, then the camera.

1. Restart the phone.
2. Clear the camera app's cache in app settings.
3. Switch between front and back cameras. If one works, the other camera or its connection is the problem.
4. Try another camera app.
5. Remove any case or ring that might cover the lens.
6. Open the phone and reseat the camera connector, especially after a drop or repair.
7. Test with a known good camera module.

If all cameras are black even with good modules, the camera circuit on the board may be faulty.$tip$,
ARRAY['Screwdriver set'], now() - interval '68 minutes'),

('hardware-tip-camera-shaking-buzzing', 'HARDWARE', 'Camera Shaking or Buzzing: Damaged Stabilisation', 'All brands', '', NULL, '/tips/hw-camera-shaking-buzzing.jpg',
$tip$If the camera image shakes, the lens buzzes or clicks, or photos are blurry, the stabiliser or autofocus is damaged.

Common causes:
1. A hard drop.
2. Strong vibration, for example a phone mounted on a motorbike handlebar.
3. Strong magnets near the camera, like some magnetic car mounts.

What to do:
1. Restart the phone and try another camera mode.
2. If the shaking continues, the camera module needs replacing.
3. Advise boda riders to use a holder with a vibration damper, or mount the phone away from the engine.

Phone makers warn that motorcycle vibration can damage camera stabilisation.$tip$,
ARRAY[]::text[], now() - interval '70 minutes'),

('hardware-tip-blurry-front-camera', 'HARDWARE', 'Blurry Front Camera', 'All brands', '', NULL, '/tips/hw-blurry-front-camera.jpg',
$tip$The front camera often looks blurry because of dirt or a protector, not a fault.

1. Wipe the front camera area with a microfibre cloth.
2. Check the screen protector doesn't cover or haze the camera. Some cheap protectors do.
3. Hold the phone further away: many front cameras have fixed focus and blur up close.
4. Turn off beauty or portrait filters that smooth the image.
5. Check for dust inside the screen near the camera after a screen replacement.

If the image is still blurry or shows a dark spot, the front camera module may be damaged or misaligned.$tip$,
ARRAY['Microfibre cloth'], now() - interval '72 minutes'),

('hardware-tip-camera-flash-torch', 'HARDWARE', 'Camera Flash or Torch Not Working', 'All brands', '', NULL, '/tips/hw-camera-flash-torch.jpg',
$tip$When the torch won't turn on, find out if it is software, the flash part or the board.

1. Charge the phone. Many phones turn the flash off at low battery or when hot.
2. Restart and try the torch from quick settings and from the camera app.
3. Close apps that may be using the camera.
4. Check the flash isn't blocked by a case.
5. Open the phone and check the flash flex or connector, especially after a back cover change.
6. Replace the flash LED or its flex if it is damaged.

If the flash stopped after water damage, check the area around the flash circuit for corrosion.$tip$,
ARRAY['Screwdriver set'], now() - interval '74 minutes'),

('hardware-tip-changing-android-back-cover', 'HARDWARE', 'Changing a Back Cover on Android Phones', 'All brands', '', NULL, '/tips/hw-changing-android-back-cover.jpg',
$tip$Back covers are clipped on some phones and glued on others.

Clipped backs (many budget phones):
1. Find the notch near the bottom or side.
2. Slide a plastic pick around the edge to release the clips.

Glued backs:
1. Warm the back evenly to soften the glue.
2. Lift with a suction cup and work picks around the edge.
3. Watch for flex cables attached to the back, like fingerprint or wireless charging.

Fitting the new back:
1. Transfer the camera lens, NFC sticker or fingerprint parts if needed.
2. Clean old glue and use proper adhesive.
3. Press it down evenly and clamp gently.

Always check the new back's camera cut out matches the phone's exact model.$tip$,
ARRAY['Heat gun or heat plate', 'Opening picks', 'Adhesive'], now() - interval '76 minutes'),

('hardware-tip-proximity-sensor-calls', 'HARDWARE', 'Proximity Sensor Problems During Calls', 'All brands', '', NULL, '/tips/hw-proximity-sensor-calls.jpg',
$tip$The proximity sensor turns the screen off when the phone is at your ear. When it fails, your cheek presses buttons, or the screen stays black after the call.

1. Clean the top of the screen near the earpiece.
2. Remove the screen protector, especially dark or privacy ones that cover the sensor.
3. Restart the phone and test with the phone's test menu if it has one.
4. After a screen replacement, check the sensor's small holder and rubber were moved to the new screen.
5. Some copy screens are not clear enough above the sensor. Try another screen.
6. If none of this helps, replace the sensor flex.

Many phones use the screen itself as the sensor, so calibration in settings can help there.$tip$,
ARRAY['Microfibre cloth'], now() - interval '78 minutes'),

('hardware-tip-fingerprint-sensor-not-working', 'HARDWARE', 'Fingerprint Sensor Not Working', 'All brands', '', NULL, '/tips/hw-fingerprint-sensor-not-working.jpg',
$tip$Fingerprint failures are often caused by dry or wet fingers, dirt or screen protectors.

1. Clean the sensor and your finger.
2. Delete your fingerprints and register them again, rolling your finger to cover the edges.
3. Register the same finger twice if allowed.
4. For sensors under the screen, use a protector that says it supports in-display fingerprint.
5. After a screen replacement, an incell or TFT screen won't work with an under-screen sensor.
6. For side or back sensors, check the flex cable and connector.

If the phone says "sensor not available", the sensor or its connection is faulty.$tip$,
ARRAY['Microfibre cloth'], now() - interval '80 minutes'),

('hardware-tip-face-id-not-available', 'HARDWARE', 'Face ID Not Available After a Drop or Repair', 'Apple', 'iPhone X and newer', NULL, '/tips/hw-face-id-not-available.jpg',
$tip$Face ID uses a set of parts near the earpiece that are paired to the iPhone's board. Damage to any of them stops Face ID.

1. Clean the top of the screen and remove the screen protector.
2. Restart the iPhone.
3. If it says "Face ID is not available", one of the parts (dot projector, infrared camera or flood light) may be damaged, often by a drop or water.
4. During screen replacements, move the earpiece flex and sensors very carefully. They are easily torn.
5. Face ID parts can't simply be swapped from another iPhone, because they are paired to the board.

Apple and some specialist shops can repair Face ID faults. Tell customers about this risk before a screen repair.$tip$,
ARRAY[]::text[], now() - interval '82 minutes'),

('hardware-tip-volume-buttons-not-working', 'HARDWARE', 'Volume Buttons Not Working', 'All brands', '', NULL, '/tips/hw-volume-buttons-not-working.jpg',
$tip$Volume buttons fail from dirt, wear or a torn flex.

1. Remove the case and press the buttons. Thick cases can block them.
2. Clean around the buttons with a soft brush and a little isopropyl alcohol, then press them many times.
3. Check the volume changes with on-screen controls, to rule out software.
4. Open the phone and inspect the volume flex for tears or corrosion.
5. Replace the flex or the small switch if it no longer clicks.

You can still change volume from the settings or with accessibility buttons on screen while waiting for a part.$tip$,
ARRAY['Isopropyl alcohol', 'Screwdriver set'], now() - interval '84 minutes'),

('hardware-tip-sim-tray-stuck', 'HARDWARE', 'SIM Tray Stuck or Lost Ejector Pin', 'All brands', '', NULL, '/tips/hw-sim-tray-stuck.jpg',
$tip$Don't force a stuck SIM tray: it can bend the reader inside.

1. Push the ejector pin straight into the small hole, firmly but gently.
2. If you lost the pin, a straightened paper clip of the right thickness works. Not a needle, which can slip into the wrong hole (often the microphone).
3. If the tray moves out a little but stops, the SIM may have shifted. Wiggle gently while pulling.
4. If it won't move at all, the tray may be the wrong one for this phone or bent. Open the phone to release it safely.
5. Always fit the correct tray for the model.

Keep a few spare trays for common models in the shop.$tip$,
ARRAY['SIM ejector pin', 'Paper clip', 'Torch'], now() - interval '86 minutes'),

('hardware-tip-second-sim-slot-not-working', 'HARDWARE', 'Second SIM Slot Not Working', 'All brands', '', NULL, '/tips/hw-second-sim-slot-not-working.jpg',
$tip$Many dual SIM phones share one slot between a second SIM and a memory card, which causes confusion.

1. Check the phone supports two SIMs. Some versions of the same model are single SIM.
2. Check the second slot isn't the memory card position.
3. Swap the SIMs between slots. If the same slot fails with both, the slot or reader is faulty.
4. In SIM settings, turn on both SIMs.
5. Check the tray isn't bent and is the right one.
6. If the slot is faulty, the SIM reader may need cleaning or replacing.

Only some phones support two SIMs on mobile data at the same time. That is normal.$tip$,
ARRAY['Two SIM cards'], now() - interval '88 minutes'),

('hardware-tip-physical-sim-or-esim', 'HARDWARE', 'Physical SIM or eSIM: What Changes for Repairs', 'All brands', '', NULL, '/tips/hw-physical-sim-or-esim.jpg',
$tip$An eSIM is built into the phone instead of being a card. It affects some repairs.

1. Before a board repair or reset, ask the customer if they use an eSIM. Resetting can delete it.
2. The customer may need to visit their network provider to get the eSIM moved or reissued.
3. Physical SIM cards can simply be moved to a loan phone. An eSIM can't.
4. Some phones have no SIM tray at all and only support eSIM.

Write on the job card if the phone uses an eSIM, so nobody resets it without warning the customer.$tip$,
ARRAY[]::text[], now() - interval '90 minutes'),

('hardware-tip-weak-signal-antenna-cables', 'HARDWARE', 'Weak Signal After a Repair: Check the Antenna Cables', 'All brands', '', NULL, '/tips/hw-weak-signal-antenna-cables.jpg',
$tip$If signal drops after a screen, battery or charging board repair, an antenna cable or contact was probably missed.

1. Compare signal with another phone on the same network in the same place.
2. Open the phone and check the thin coaxial antenna cables are clicked onto their connectors.
3. Check the cables aren't pinched under a bracket or screw.
4. Clean the small spring contacts that touch the antenna in the frame or back cover.
5. If the frame was replaced, check antenna parts were moved over.

Low signal that started after a drop, not a repair, may be a fault on the board's radio section.$tip$,
ARRAY['Screwdriver set', 'Plastic spudger'], now() - interval '92 minutes'),

('hardware-tip-headphone-jack-not-working', 'HARDWARE', 'Headphone Jack Not Working', 'All brands', '', NULL, '/tips/hw-headphone-jack-not-working.jpg',
$tip$If earphones don't work in the jack, or the phone thinks earphones are always plugged in, check the jack.

1. Try another set of earphones.
2. Look into the jack with a torch and remove lint with a wooden toothpick.
3. If the phone shows a headphone icon with nothing plugged in, the jack's switch is stuck or there is moisture inside.
4. Plug earphones in and out a few times to clear dirt.
5. On many phones the jack is on the charging board, so replacing that board fixes it.

If the jack stopped after water, have the charging board checked for corrosion.$tip$,
ARRAY['Wooden toothpick', 'Torch'], now() - interval '94 minutes'),

('hardware-tip-screen-replacement-time', 'HARDWARE', 'How Long a Screen Replacement Should Take', 'All brands', '', NULL, '/tips/hw-screen-replacement-time.jpg',
$tip$Customers often ask how long they must wait. Rough times for a skilled technician:

1. Screen with frame (many Samsung and Android models): 30 to 60 minutes.
2. Screen without frame, glued in: 1 to 2 hours, plus glue setting time.
3. iPhone screens: 30 to 60 minutes.
4. Tablet glass: 1 to 3 hours.

What adds time:
1. Removing a stubborn old screen or a swollen battery.
2. Cleaning a bent or dirty frame.
3. Letting glue set before the phone can be used safely.

Give the customer an honest time and call them if it changes. A rushed glue job often comes back.$tip$,
ARRAY[]::text[], now() - interval '96 minutes'),

('hardware-tip-folding-screen-flex-safely', 'HARDWARE', 'Folding a Screen Flex Without Tearing It', 'All brands', '', NULL, '/tips/hw-folding-screen-flex-safely.jpg',
$tip$Many new screens arrive with the flex cable flat. Folding it wrongly cracks the tiny tracks inside.

1. Compare with the old screen to see exactly where and how the flex bends.
2. Fold along the same line, in one smooth curve, not a sharp crease.
3. Don't fold and unfold the flex several times.
4. Hold the screen by its edges, not by the flex.
5. Connect the flex gently by pressing straight down on the connector.

Lines or touch problems on a brand new screen are often caused by a flex that was creased during fitting.$tip$,
ARRAY['Plastic spudger'], now() - interval '98 minutes')
ON CONFLICT ("id") DO NOTHING;
