-- One-time content load (no schema change): 25 hardware tips on screens and small parts (speaker, mic, camera, buttons, SIM),
-- each with its own photo from public/tips (free Pexels photos).
-- Fixed ids + ON CONFLICT DO NOTHING: added once, admin edits never overwritten.

INSERT INTO "RepairGuide" ("id", "category", "title", "brand", "modelName", "videoUrl", "thumbnail", "content", "toolsUsed", "createdAt") VALUES
('hardware-tip-lines-on-screen-after-drop', 'HARDWARE', 'Lines or Colour Bars on the Screen After a Drop', 'All brands', '', NULL, '/tips/hw-lines-on-screen-after-drop.jpg',
$tip$Lines, colour bars or a flashing screen after a drop usually mean the display panel itself is damaged, but sometimes it is only the connector.

1. Restart the phone. If the lines move, change colour or disappear for a moment, the panel is cracked inside.
2. Take a screenshot and view it on another phone. If the screenshot looks clean, the fault is in the screen, not the software.
3. Press gently near the lines. If they change, the panel is damaged and needs replacing.
4. If the lines appeared without any drop, open the phone and reseat the display connector. A connector that popped half out can cause the same lines.
5. If reseating doesn't help, replace the screen. A new screen is the only lasting fix for internal panel damage.

Back up the phone first: a screen with spreading lines can go fully black at any time.$tip$,
ARRAY['Screwdriver set', 'Plastic opening tool'], now() - interval '2 minutes'),

('hardware-tip-cracked-glass-or-broken-display', 'HARDWARE', 'Cracked Glass or Broken Display? How to Tell Before Buying a Screen', 'All brands', '', NULL, '/tips/hw-cracked-glass-or-broken-display.jpg',
$tip$Many customers think a cracked phone needs a whole new screen. Check what is really broken first.

Only the top glass is cracked if:
1. The picture is clear with no black spots, lines or bleeding colour.
2. Touch works everywhere, including over the cracks.

The display is broken if:
1. You see black ink spots that spread, green or white lines, or no picture at all.
2. Parts of the screen don't respond to touch.

On most modern phones the glass, touch layer and display are bonded into one part, so even "only glass" damage is usually fixed by fitting a full screen. Glass only replacement needs a separating machine, a laminator and dust free conditions, so few shops do it well.

If the display still works perfectly, a good screen protector over small cracks can buy time and stop glass splinters.$tip$,
ARRAY['Flashlight'], now() - interval '4 minutes'),

('hardware-tip-screen-protector-types', 'HARDWARE', 'Tempered Glass vs Plastic Screen Protectors: Which Protects Better', 'All brands', '', NULL, '/tips/hw-screen-protector-types.jpg',
$tip$A screen protector costs a small fraction of a new screen.

Tempered glass: hard, feels like the real screen and takes the impact by cracking itself. Best for most phones.
Full glue tempered glass: sticks across the whole surface, so there are no rainbow patches. Good for curved screens if it is the right shape.
Plastic (TPU) film: thin and flexible. It stops scratches but does little against drops.
Privacy glass: darkens the screen from the side. Useful in matatus and offices, but makes the screen dimmer.

To fit it cleanly:
1. Clean the screen with alcohol wipe, then a dry microfibre cloth.
2. Lift every dust spot with a dust sticker.
3. Line up the protector by the earpiece and camera, then lay it down from one side.
4. Push bubbles out to the edges with a card in a cloth.

Change a cracked protector straight away: sharp edges cut fingers and the next drop will hit the real screen.$tip$,
ARRAY['Screen protector', 'Microfibre cloth', 'Dust sticker'], now() - interval '6 minutes'),

('hardware-tip-ghost-touch', 'HARDWARE', 'Ghost Touch: Why a Screen Taps Itself and How to Fix It', 'All brands', '', NULL, '/tips/hw-ghost-touch.jpg',
$tip$Ghost touch is when the phone opens apps, types or scrolls by itself.

Try these first:
1. Remove the screen protector and case. A cracked or lifted protector often causes it.
2. Unplug the charger. A poor quality charger can make the touch layer misbehave while charging.
3. Clean the screen and dry your hands. Water drops cause false touches.
4. Restart and update the phone.

If it still happens:
1. If the screen was recently replaced, the new screen may be low quality or was pressed too hard by a bent frame.
2. Open the phone and check the display connector for dirt or corrosion.
3. Check for a swollen battery pushing against the screen from behind.
4. If none of these, replace the screen with a better quality one.

Ghost touch that appears after a drop or water usually means the screen is damaged.$tip$,
ARRAY['Screwdriver set', 'Isopropyl alcohol'], now() - interval '8 minutes'),

('hardware-tip-oled-incell-tft-screens', 'HARDWARE', 'OLED, Incell and TFT Replacement Screens Explained', 'All brands', '', NULL, '/tips/hw-oled-incell-tft-screens.jpg',
$tip$Replacement screens for the same phone come in very different qualities. Know what you are selling or buying.

Original or service pack OLED: same as the phone came with. Best colours, thinnest, works with the fingerprint reader under the screen. Most expensive.
Aftermarket OLED: copy OLED panels. Good colours and usually work with the in-display fingerprint. Quality varies by supplier.
Incell (LCD): cheaper LCD copy for phones that came with OLED. Thicker, dimmer, uses more battery, and the in-display fingerprint usually won't work.
TFT: the cheapest LCD type. Washed out colours and poor viewing angles.

Before fitting:
1. Tell the customer which type they are getting and why the price differs.
2. Mention that fingerprint under the screen may not work with incell or TFT.
3. Test the screen fully before gluing (see our tip on testing a new screen).

Honest labels avoid comebacks and arguments later.$tip$,
ARRAY[]::text[], now() - interval '10 minutes'),

('hardware-tip-checks-before-fitting-screen', 'HARDWARE', '10 Checks Before Fitting a New Screen', 'All brands', '', NULL, '/tips/hw-checks-before-fitting-screen.jpg',
$tip$Most screen comebacks are caused by something missed before fitting.

1. Test the phone with the old screen if it still shows anything, and note what works (cameras, Face ID, buttons, sensors).
2. Check the frame for bends. A bent frame cracks the new screen.
3. Look for a swollen battery.
4. Check the display connector on the board for bent pins or corrosion.
5. Make sure the new screen is the exact model (many phones have two or three versions).
6. Compare the flex cable length and shape with the old screen.
7. Move over the earpiece mesh, proximity sensor holder and brackets if the new screen lacks them.
8. Connect and test the new screen before removing its protective films.
9. Disconnect the battery before connecting or disconnecting any screen.
10. Clean old glue completely so the screen sits flat.

Write the customer's faults on the job card before you start, so nobody blames the new screen for an old problem.$tip$,
ARRAY['Screwdriver set', 'Multimeter'], now() - interval '12 minutes'),

('hardware-tip-removing-glued-screen', 'HARDWARE', 'Removing a Glued Screen Safely with Heat and a Separator', 'All brands', '', NULL, '/tips/hw-removing-glued-screen.jpg',
$tip$Most phones have the screen glued to the frame. Rushing this step breaks screens and flex cables.

1. Power off the phone and remove the SIM tray.
2. Warm the screen edges evenly to about 80 to 90°C with a separator plate or a heat gun on low. Keep the heat moving and away from the back camera area.
3. Lift a corner with a suction cup and slide in a thin plastic pick.
4. Work the pick around the edge slowly. Don't go deeper than a few millimetres, especially near the flex cable.
5. A few drops of isopropyl alcohol on the glue line helps soften it.
6. Lift the screen like a book on the side where the flex is, then disconnect the battery before the screen connector.

On phones with the battery under the screen, never push a metal tool deep into the phone: puncturing the battery can start a fire.$tip$,
ARRAY['Heat gun or separator plate', 'Suction cup', 'Opening picks', 'Isopropyl alcohol'], now() - interval '14 minutes'),

('hardware-tip-black-screen-phone-rings', 'HARDWARE', 'Black Screen but the Phone Rings: Check the Display Connector', 'All brands', '', NULL, '/tips/hw-black-screen-phone-rings.jpg',
$tip$If the phone rings, vibrates or connects to a computer but the screen stays black, the phone is alive and the fault is in the display path.

1. Call the phone or plug it into a laptop to confirm it is on.
2. Shine a torch at an angle on the screen. If you can faintly see icons, the backlight has failed (common on LCD phones).
3. Open the phone, disconnect the battery and reseat the display connector.
4. Clean the connector with isopropyl alcohol and a soft brush if you see dirt or green corrosion.
5. Test with a known good screen. If a good screen works, replace the screen.
6. If a good screen also stays black, the fault is on the board (display connector, filter or backlight circuit), which needs a board technician.

Always disconnect the battery before reseating any connector to avoid blowing filters on the board.$tip$,
ARRAY['Screwdriver set', 'Plastic spudger', 'Isopropyl alcohol', 'Brush'], now() - interval '16 minutes'),

('hardware-tip-screen-glue-b7000-t7000', 'HARDWARE', 'Choosing and Using Screen Glue: B7000, T7000 and Adhesive Strips', 'All brands', '', NULL, '/tips/hw-screen-glue-b7000-t7000.jpg',
$tip$The wrong glue or too much of it causes lifted screens, light leaks and damaged displays.

B7000 (clear): general screen and back glass glue. Sets in a few hours.
T7000 (black): stronger and darker. Good for frames and where light might leak.
Ready cut adhesive: cleanest finish for phones that came with it (many iPhones and Samsungs).

How to glue well:
1. Remove all old glue. Leftovers stop the screen sitting flat.
2. Clean the frame with isopropyl alcohol.
3. Apply a thin, even line on the frame, not on the screen, and keep it away from the edges of the display panel.
4. Fit the screen, wipe off any squeeze out right away.
5. Clamp gently or use rubber bands for at least a few hours. Don't overtighten OLED screens.
6. Tell the customer not to get the phone wet: home glue is not waterproof like the factory seal.

Never let glue touch the display flex or connectors.$tip$,
ARRAY['B7000 or T7000 glue', 'Adhesive strips', 'Clamps or rubber bands', 'Isopropyl alcohol'], now() - interval '18 minutes'),

('hardware-tip-oled-burn-in', 'HARDWARE', 'Screen Burn-In on OLED: Causes and What Helps', 'All brands', '', NULL, '/tips/hw-oled-burn-in.jpg',
$tip$Burn-in is a faint permanent shadow of the keyboard, status bar or an app, seen on a grey or white background. It happens to OLED screens shown the same image for a long time at high brightness.

What helps prevent it:
1. Use auto brightness and avoid max brightness for hours.
2. Use dark mode and a moving or changing wallpaper.
3. Set a short screen timeout.
4. Turn off "always on display" if you don't need it.
5. Hide navigation buttons and use gestures.

If it already shows:
1. Light burn-in sometimes fades a little with dark mode and lower brightness, but it doesn't go away.
2. The only real fix is replacing the screen.

Phones used as shop displays, ride apps or GPS all day are the most at risk.$tip$,
ARRAY[]::text[], now() - interval '20 minutes'),

('hardware-tip-samsung-amoled-green-line', 'HARDWARE', 'Green or Pink Line on Samsung AMOLED Screens', 'Samsung', '', NULL, '/tips/hw-samsung-amoled-green-line.jpg',
$tip$A thin green, pink or white line running top to bottom on some Samsung AMOLED phones, often after an update or with no drop at all, is a known panel fault.

1. Take a screenshot. If the line isn't in the screenshot, the panel is faulty.
2. Update the phone. An update won't fix a damaged panel, but rules out software.
3. If the phone is still under warranty, send the customer to an authorised Samsung service centre first. Some regions have run free screen programmes for this fault.
4. Otherwise the fix is a new screen. A service pack screen with frame is quickest and keeps the fingerprint sensor working.

Don't try heating or pressing the screen to make the line go away: it can spread the damage.$tip$,
ARRAY['Screwdriver set', 'Heat gun or separator plate'], now() - interval '22 minutes'),

('hardware-tip-touch-not-working-after-screen-replacement', 'HARDWARE', 'Touch Not Working After a Screen Replacement', 'All brands', '', NULL, '/tips/hw-touch-not-working-after-screen-replacement.jpg',
$tip$The new screen shows a picture but touch doesn't respond, or only part of it works.

1. Disconnect the battery and reseat the screen connector. Make sure it clicks fully in.
2. On phones with a separate touch connector, check that one is fitted too.
3. Look for a torn or creased flex near the bend. Folding the new screen too sharply can damage it.
4. Check the board connector pins under a magnifier for one that is bent or dirty.
5. Remove the screen protective film: some thick films block touch.
6. Restart the phone after the first boot. Some phones calibrate touch on start.
7. Test with another new screen. Copy screens sometimes arrive faulty.

If two good screens both fail touch, the fault is on the board (touch IC or filter), which needs a board technician.$tip$,
ARRAY['Screwdriver set', 'Plastic spudger'], now() - interval '24 minutes'),

('hardware-tip-iphone-screen-true-tone', 'HARDWARE', 'iPhone Screen Replacement: Keep True Tone Working', 'Apple', 'iPhone 8 and newer', NULL, '/tips/hw-iphone-screen-true-tone.jpg',
$tip$When an iPhone screen is replaced, True Tone may disappear and newer iPhones may show a "Unknown Part" or "Genuine display" message.

1. Before replacing, note if True Tone is on in Settings, Display & Brightness.
2. Use a screen programmer to copy the original screen's data to the new screen, then True Tone comes back on most models.
3. Keep the original screen until the job is done, because the data is read from it.
4. On newer iPhones, the parts message stays even with a programmer unless the part is a genuine Apple part fitted through Apple's repair process. The phone still works normally.
5. Tell the customer about the message before the repair so they are not surprised.

Moving the original earpiece flex and proximity sensor carefully is important too: Face ID uses parts near the earpiece.$tip$,
ARRAY['Pentalobe and tri-point screwdrivers', 'Screen programmer (optional)'], now() - interval '26 minutes'),

('hardware-tip-screen-flicker-low-brightness', 'HARDWARE', 'Screen Flickers at Low Brightness', 'All brands', '', NULL, '/tips/hw-screen-flicker-low-brightness.jpg',
$tip$Some screens flicker or look grainy when the brightness is low. It can cause eye strain and headaches.

1. Restart the phone and update it. Some flicker is a software bug that updates fix.
2. Look for "PWM dimming", "DC dimming" or "eye comfort" settings. Some phones have an option that reduces flicker.
3. Turn on "extra dim" or "reduce white point" and keep the main brightness a bit higher instead. This lowers flicker on many OLED phones.
4. If it began after a screen replacement, the new panel (often a copy OLED or incell) may be the cause. Try another screen.
5. If the screen flickers even at full brightness, or flickers when you press it, the screen or connector is faulty.

Flicker at low brightness is common on OLED and is not always a fault.$tip$,
ARRAY[]::text[], now() - interval '28 minutes'),

('hardware-tip-dead-pixels-black-spots', 'HARDWARE', 'Dead Pixels and Black Spots on the Screen', 'All brands', '', NULL, '/tips/hw-dead-pixels-black-spots.jpg',
$tip$A black spot that grows, or a patch of dead pixels, means the screen is physically damaged.

Common causes:
1. Sitting on the phone in a back pocket.
2. A drop on a corner.
3. A swollen battery or bent frame pressing from behind.
4. Pressing hard on the screen with a sharp object.

What to do:
1. Back up the phone now: black ink spots usually spread until the screen is black.
2. Check for a swollen battery behind the screen.
3. Replace the screen. "Pixel fixing" apps don't fix physical damage.
4. After fitting, check the frame is flat and the battery isn't swollen, or the new screen will get the same spot.

A single stuck coloured pixel without damage sometimes fixes itself, but black spots don't.$tip$,
ARRAY[]::text[], now() - interval '30 minutes'),

('hardware-tip-bent-frame-cracks-new-screen', 'HARDWARE', 'Check the Frame Before Fitting a Screen: Bent Frames Crack New Glass', 'All brands', '', NULL, '/tips/hw-bent-frame-cracks-new-screen.jpg',
$tip$A screen that cracks a day or two after fitting is often caused by a bent frame, not a weak screen.

1. Lay the phone frame on a flat glass surface and look for gaps or rocking.
2. Check corners where the phone was dropped. A raised corner presses into the new screen.
3. Gently straighten small bends with plastic pliers or a frame tool. Don't force aluminium too much: it can crack.
4. File away any burrs or bits of old glue on the frame edges.
5. If the frame is badly bent, use a new frame or a screen with frame included.

Explain to the customer before fitting if the frame is bent. It saves you a free second screen.$tip$,
ARRAY['Flat glass surface', 'Plastic pliers or frame straightener'], now() - interval '32 minutes'),

('hardware-tip-test-new-screen-before-gluing', 'HARDWARE', 'Test the New Screen Before You Glue It', 'All brands', '', NULL, '/tips/hw-test-new-screen-before-gluing.jpg',
$tip$Once a screen is glued, you usually can't return it to the supplier. Test it first.

1. Connect the new screen with the phone open and the films still on.
2. Check for lines, dead pixels and colour tint on white, black, red, green and blue images (search for a "screen test" image).
3. Test touch everywhere: draw lines from corner to corner in a drawing app or the phone's test menu.
4. Check brightness at max and min, and auto brightness.
5. Test the proximity sensor (screen goes off on a call when covered) and the earpiece.
6. Test the fingerprint reader if it is under the screen.
7. Disconnect the battery, then the screen, and only then glue and close.

If anything fails, return the screen to your supplier as it is, with films still on.$tip$,
ARRAY['Screwdriver set'], now() - interval '34 minutes'),

('hardware-tip-muffled-earpiece', 'HARDWARE', 'Muffled Earpiece: Clean the Mesh Before Changing the Speaker', 'All brands', '', NULL, '/tips/hw-muffled-earpiece.jpg',
$tip$When callers sound quiet or muffled, the earpiece mesh is usually blocked with dust and skin oil.

1. Turn up call volume during a call to confirm.
2. Brush the earpiece grille gently with a soft, dry toothbrush.
3. Dip the brush lightly in isopropyl alcohol for sticky dirt. Don't let liquid run into the phone.
4. Remove any screen protector that covers the earpiece.
5. Test on speakerphone. If speaker is fine but earpiece is still weak, the earpiece speaker itself may be damaged.
6. Open the phone and check the mesh from inside, then replace the earpiece if needed.

On phones with a replaced screen, a missing earpiece mesh or a wrong bracket can also make calls quiet or crackly.$tip$,
ARRAY['Soft toothbrush', 'Isopropyl alcohol', 'Dust blower'], now() - interval '36 minutes'),

('hardware-tip-crackling-loudspeaker', 'HARDWARE', 'Crackling or Buzzing Speaker: Test, Clean or Replace', 'All brands', '', NULL, '/tips/hw-crackling-loudspeaker.jpg',
$tip$A loudspeaker that crackles or buzzes at high volume is usually torn, blocked or loose.

1. Play music at medium and high volume. Crackling only at high volume usually means a damaged speaker.
2. Clean the speaker grille with a soft brush. Metal dust in the speaker magnet causes buzzing.
3. Remove the case. Some cases cover the speaker hole.
4. Open the phone and check the speaker module is screwed down and its contacts are clean.
5. Measure the speaker with a multimeter: a typical phone speaker reads about 6 to 8 ohms. Open circuit means replace it.
6. Fit a new speaker module and test again.

If there is no sound at all from any speaker and headphones also don't work, the fault may be the audio IC on the board.$tip$,
ARRAY['Screwdriver set', 'Soft brush', 'Multimeter'], now() - interval '38 minutes'),

('hardware-tip-faulty-microphone', 'HARDWARE', 'Callers Can''t Hear You: Finding a Faulty Microphone', 'All brands', '', NULL, '/tips/hw-faulty-microphone.jpg',
$tip$Most phones have two or three microphones: one at the bottom for calls, and others near the top or camera for noise cancelling and video.

1. Record a voice note. If it is silent, the main microphone or its hole is blocked or faulty.
2. Record a video with the back camera. If video sound works but calls don't, the bottom mic is the problem.
3. Test on speakerphone. Speaker calls often use a different mic.
4. Clean the mic hole gently with a dry soft brush. Never push a pin into it: it can break the mic membrane.
5. Check app permissions for the microphone, and remove Bluetooth devices that may be taking the audio.
6. Replace the charging port flex or mic module (on many phones the main mic is on the charging board).

If no microphone works at all, the fault may be on the main board.$tip$,
ARRAY['Screwdriver set', 'Soft brush'], now() - interval '40 minutes'),

('hardware-tip-blurry-back-camera', 'HARDWARE', 'Blurry Back Camera: Lens Glass, Dust or a Bad Module?', 'All brands', '', NULL, '/tips/hw-blurry-back-camera.jpg',
$tip$A blurry camera is not always a broken camera.

1. Wipe the camera glass with a microfibre cloth. Fingerprints are the most common cause.
2. Check the outer lens glass for cracks or scratches. A cracked lens cover gives haze and glare. It is cheap to replace.
3. Look for dust inside the lens cover. Dust gets in through a cracked lens glass.
4. Tap the screen to focus on something close and far. If the camera can't focus at all, or you hear a buzzing click, the autofocus is damaged (often from a drop).
5. Try another camera app to rule out software.
6. Replace the camera module if focus or stabilisation is broken.

On many phones, replacing only the lens glass fixes the problem for a small price.$tip$,
ARRAY['Microfibre cloth', 'Screwdriver set'], now() - interval '42 minutes'),

('hardware-tip-stuck-power-button', 'HARDWARE', 'Stuck or Dead Power Button: Flex Cable Fixes', 'All brands', '', NULL, '/tips/hw-stuck-power-button.jpg',
$tip$A power or volume button that doesn't click, stays pressed, or does nothing is usually dirt, a worn switch or a torn flex.

1. Check the case isn't pressing the button.
2. Clean around the button with a brush and a little isopropyl alcohol. Press it many times to work the dirt out.
3. If the phone keeps restarting or showing the power menu, the button may be stuck pressed. This is a common cause of boot loops.
4. Open the phone and test the switch with a multimeter in continuity mode: it should beep only when pressed.
5. Replace the button flex if the switch is worn or the flex is torn.

While waiting for a part, the phone can be woken by plugging in the charger, and many phones allow double tap to wake.$tip$,
ARRAY['Screwdriver set', 'Isopropyl alcohol', 'Multimeter'], now() - interval '44 minutes'),

('hardware-tip-sim-not-detected', 'HARDWARE', 'SIM Not Detected: Tray, Reader and Contacts', 'All brands', '', NULL, '/tips/hw-sim-not-detected.jpg',
$tip$"No SIM" can be the card, the tray or the SIM reader in the phone.

1. Try the SIM in another phone. If it fails there too, replace the SIM at your network provider's service centre.
2. Try another SIM in the phone.
3. Check the tray is the right one for this model and isn't bent. A wrong tray presses the card in the wrong place.
4. Clean the SIM gold contacts with a dry cloth.
5. Look into the SIM slot with a light for bent pins.
6. Restart the phone and toggle airplane mode.

If both slots fail with good SIM cards, the SIM reader or its circuit on the board is faulty. Bent reader pins can sometimes be lifted carefully with a fine pick.

If a phone shows "SIM locked to network", that is a carrier lock, not a hardware fault: contact the network that sold the phone.$tip$,
ARRAY['SIM ejector tool', 'Isopropyl alcohol', 'Magnifier'], now() - interval '46 minutes'),

('hardware-tip-phone-not-vibrating', 'HARDWARE', 'Phone Not Vibrating: Testing the Vibration Motor', 'All brands', '', NULL, '/tips/hw-phone-not-vibrating.jpg',
$tip$If the phone rings but doesn't vibrate, check settings before opening it.

1. Make sure vibration is on in Sound settings, and that vibration intensity isn't turned down to zero.
2. Turn off power saving modes, which sometimes stop vibration.
3. Use the phone's hardware test menu if it has one to test vibration.
4. Open the phone and check the vibration motor's spring contacts are clean and touching the board.
5. Measure the motor with a multimeter: a working motor usually reads about 10 to 40 ohms. Open circuit means replace it.
6. A loose rattle inside the phone can be the motor if its glue let go. Reglue or replace it.

Water and drops are the most common reasons a vibration motor stops.$tip$,
ARRAY['Screwdriver set', 'Multimeter'], now() - interval '48 minutes'),

('hardware-tip-replacing-back-glass', 'HARDWARE', 'Replacing Cracked Back Glass Without Damaging the Camera', 'All brands', '', NULL, '/tips/hw-replacing-back-glass.jpg',
$tip$Cracked back glass looks bad but also lets in dust and water, and sharp pieces cut hands.

1. Cover the cracked glass with packing tape first to hold the pieces together.
2. On most Android phones, warm the back evenly and lift it with picks. Avoid the camera lens area.
3. On newer iPhones the back glass may be removable or bonded depending on the model. Bonded ones need a laser machine, so check the model first.
4. Remove every bit of old glue and broken glass.
5. Move the camera lens ring and wireless charging coil carefully if they are attached to the old back.
6. Fit the new back with a thin, even line of glue or ready cut adhesive, and clamp it gently.

Always disconnect the battery before working near the camera or charging coil.$tip$,
ARRAY['Heat gun or separator plate', 'Opening picks', 'B7000 or adhesive', 'Laser machine (some iPhones)'], now() - interval '50 minutes')
ON CONFLICT ("id") DO NOTHING;
