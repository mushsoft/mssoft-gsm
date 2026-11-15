-- One-time content load (no schema change): 25 hardware tips on power safety, batteries and everyday phone care,
-- each with its own photo from public/tips (free Pexels photos).
-- Fixed ids + ON CONFLICT DO NOTHING: added once, admin edits never overwritten.

INSERT INTO "RepairGuide" ("id", "category", "title", "brand", "modelName", "videoUrl", "thumbnail", "content", "toolsUsed", "createdAt") VALUES
('hardware-tip-screen-protector-edges-lifting', 'HARDWARE', 'Screen Protector Edges Lifting', 'All brands', '', NULL, '/tips/hw-screen-protector-edges-lifting.jpg',
$tip$Lifting edges collect dirt and soon the protector peels off.

1. Curved screens need protectors made for curves, often full glue or UV glue types. Flat protectors lift at the edges.
2. Thick cases can push the protector edges up. Try a slimmer case or a case friendly protector (slightly smaller).
3. Clean the edge, then press it down firmly for 30 seconds.
4. If dirt is already under the edge, replace the protector.

A protector lifting in the middle can mean a swollen battery pushing the screen. Check that first.$tip$,
ARRAY['Microfibre cloth', 'Dust stickers'], now() - interval '100 minutes'),

('hardware-tip-privacy-screen-protectors', 'HARDWARE', 'Privacy Screen Protectors: Pros and Cons', 'All brands', '', NULL, '/tips/hw-privacy-screen-protectors.jpg',
$tip$Privacy protectors darken the screen from the sides so people next to you can't read it.

Pros:
1. Protects PINs, mobile money and messages in taxis, banks and offices.
2. Still protects the glass like a normal tempered glass.

Cons:
1. The screen looks darker, so you raise brightness and use more battery.
2. Can block the proximity sensor or in-screen fingerprint on some phones.
3. Harder to show the screen to others.

Choose one made for your exact model so it doesn't cover the sensors.$tip$,
ARRAY[]::text[], now() - interval '102 minutes'),

('hardware-tip-matte-vs-glossy-screen-protectors', 'HARDWARE', 'Matte vs Glossy Screen Protectors', 'All brands', '', NULL, '/tips/hw-matte-vs-glossy-screen-protectors.jpg',
$tip$Glossy (clear) protectors keep the screen sharp and bright. They show fingerprints and reflections.

Matte protectors reduce glare and fingerprints, and feel smooth for gaming. They make the screen slightly less sharp.

Choose matte if you use the phone outdoors a lot or play games. Choose glossy if you watch videos and photos.

Both types come as tempered glass for real protection.$tip$,
ARRAY[]::text[], now() - interval '104 minutes'),

('hardware-tip-screen-protector-blocking-fingerprint', 'HARDWARE', 'Screen Protector Blocking the Fingerprint Sensor', 'All brands', '', NULL, '/tips/hw-screen-protector-blocking-fingerprint.jpg',
$tip$Phones with the fingerprint reader under the screen are fussy about protectors.

1. Use protectors labelled for in-display fingerprint, made for your exact model.
2. After fitting, delete and register your fingerprints again with the protector on.
3. Make sure there are no bubbles or dust over the sensor area.
4. Ultrasonic sensors (some Samsungs) need very thin, full glue protectors.

If it still fails, try another brand of protector before suspecting the phone.$tip$,
ARRAY[]::text[], now() - interval '106 minutes'),

('hardware-tip-screen-scratches-removal', 'HARDWARE', 'Screen Scratches: What Removes Them and What Doesn''t', 'All brands', '', NULL, '/tips/hw-screen-scratches-removal.jpg',
$tip$Deep scratches in phone glass can't be polished out at home.

1. Toothpaste and baking soda tricks only hide tiny marks and can damage the screen's oil resistant coating.
2. Light scratches on a protector: replace the protector.
3. Deep scratches on the glass: only a new screen (or new glass) removes them.
4. Sand and keys in the same pocket are the main cause. Keep the phone in its own pocket.

A tempered glass protector from day one is the easiest answer.$tip$,
ARRAY[]::text[], now() - interval '108 minutes'),

('hardware-tip-flip-phone-hinge-screen', 'HARDWARE', 'Flip Phone Screen Stops Working When Opened', 'All brands', '', NULL, '/tips/hw-flip-phone-hinge-screen.jpg',
$tip$Flip phones break at the hinge, where a thin flex cable runs to the screen.

1. If the screen works only at some angles, the hinge flex is worn.
2. A loose hinge can be tightened or replaced on many models.
3. Replacing the hinge flex often needs the phone fully opened, so it takes patience.
4. For modern foldable smartphones, the inner screen is expensive and fragile. Use the maker's service centre where possible.

Open and close flip phones gently, not with a one handed flick.$tip$,
ARRAY['Screwdriver set'], now() - interval '110 minutes'),

('hardware-tip-charging-many-phones-extension', 'HARDWARE', 'Charging Many Phones from One Extension: Do It Safely', 'All brands', '', NULL, '/tips/hw-charging-many-phones-extension.jpg',
$tip$Shops and homes often charge many phones from one extension. Do it safely.

1. Use a good quality extension with a fuse and surge protection.
2. Don't plug one extension into another.
3. Keep the total load low: phone chargers use little power, but heaters and kettles don't belong on the same extension.
4. Keep it off the floor where water can reach it.
5. Feel the plugs and extension now and then. Warm plugs mean a poor connection.
6. Switch it off at night if you don't need it.

A melted extension is a fire risk. Replace any that are discoloured or loose.$tip$,
ARRAY['Good extension lead with surge protection'], now() - interval '112 minutes'),

('hardware-tip-loose-wall-sockets-hazard', 'HARDWARE', 'Loose Wall Sockets: A Hidden Charging Hazard', 'All brands', '', NULL, '/tips/hw-loose-wall-sockets-hazard.jpg',
$tip$A loose socket where the plug falls out or wiggles can overheat.

Signs:
1. Plugs fall out or sit at an angle.
2. Charging stops and starts.
3. The socket feels warm or has brown marks.
4. Crackling sounds or a burning smell.

What to do:
1. Stop using that socket.
2. Have an electrician replace it.
3. Don't wedge plugs with paper or tape.

Many "phone not charging" problems are really a bad socket.$tip$,
ARRAY[]::text[], now() - interval '114 minutes'),

('hardware-tip-power-strips-with-usb-ports', 'HARDWARE', 'Power Strips with USB Ports: Are They Good?', 'All brands', '', NULL, '/tips/hw-power-strips-with-usb-ports.jpg',
$tip$Extensions with built in USB ports are handy. Quality varies a lot.

1. Check the total USB output: many give only 2A shared between all ports, which charges slowly.
2. Better ones have USB-C with fast charging (PD).
3. Cheap ones get warm and may have poor protection.
4. Test the ports with a USB meter.
5. For fast charging, a separate good charger is often better.

Buy from known brands with surge protection.$tip$,
ARRAY['USB meter'], now() - interval '116 minutes'),

('hardware-tip-overloaded-sockets-repair-shop', 'HARDWARE', 'Overloaded Sockets in Repair Shops', 'All brands', '', NULL, '/tips/hw-overloaded-sockets-repair-shop.jpg',
$tip$Repair shops run soldering stations, hot air, power supplies, chargers and lights all together. Overloaded sockets cause fires.

1. Have an electrician check your shop's wiring and add sockets where needed.
2. Put high power tools (hot air, heat guns, kettles) on their own sockets.
3. Don't chain extensions.
4. Tidy cables off the floor and away from heat.
5. Switch everything off at the end of the day.
6. Keep a CO2 or powder fire extinguisher nearby.

Tangled extensions taped to walls are a warning sign.$tip$,
ARRAY[]::text[], now() - interval '118 minutes'),

('hardware-tip-damaged-plugs-and-cables', 'HARDWARE', 'Damaged Plugs and Cables: When to Replace', 'All brands', '', NULL, '/tips/hw-damaged-plugs-and-cables.jpg',
$tip$Replace a plug or cable straight away if:

1. The outer cover is cut and inner wires show.
2. The plug is cracked, loose or the pins are bent.
3. There are burn marks, melting or a burning smell.
4. It sparks when you plug it in.
5. It gets hot during normal use.

Don't repair mains cables with tape. Use a new cable or ask an electrician to fit a proper plug.$tip$,
ARRAY[]::text[], now() - interval '120 minutes'),

('hardware-tip-choosing-extension-lead', 'HARDWARE', 'Choosing a Good Extension Lead', 'All brands', '', NULL, '/tips/hw-choosing-extension-lead.jpg',
$tip$A good extension lead protects your devices and your home.

1. Look for a fuse and an on/off switch.
2. Surge protection helps during storms and when power returns after a cut.
3. Thick cable and heavy plugs are signs of better quality.
4. Enough sockets for your needs, so you don't chain extensions.
5. Child safety shutters on the sockets.
6. A known brand with a safety mark.

Very light, cheap extensions often use thin wire that overheats.$tip$,
ARRAY[]::text[], now() - interval '122 minutes'),

('hardware-tip-charging-during-power-cuts', 'HARDWARE', 'Charging Phones During Power Cuts', 'All brands', '', NULL, '/tips/hw-charging-during-power-cuts.jpg',
$tip$Plan ahead for power cuts.

1. Keep a charged power bank at home, and recharge it after each use.
2. Charge phones fully when power is on, especially in the evening.
3. Turn on battery saver and lower brightness during long cuts.
4. Car chargers work when the car is running.
5. Small solar panels with USB ports can charge phones and power banks in daylight.
6. When power returns, wait a few minutes before plugging chargers back in, to avoid surges.

Generators: only charge once the generator is running smoothly.$tip$,
ARRAY['Power bank', 'Solar charger'], now() - interval '124 minutes'),

('hardware-tip-fast-chargers-in-power-strips-heat', 'HARDWARE', 'Fast Chargers in Power Strips: Heat Problems', 'All brands', '', NULL, '/tips/hw-fast-chargers-in-power-strips-heat.jpg',
$tip$Many chargers packed tightly together get hot.

1. Leave space between chargers so air can flow.
2. Don't cover chargers with cloth or bags.
3. Unplug chargers when not in use: they still use a little power and stay warm.
4. Replace chargers that get too hot to touch.
5. Use one good multi port charger instead of many cheap ones.

Warm is normal while charging. Hot is not.$tip$,
ARRAY[]::text[], now() - interval '126 minutes'),

('hardware-tip-wireless-charging-pad-choose', 'HARDWARE', 'Wireless Charging Pads: Choose a Safe One', 'All brands', '', NULL, '/tips/hw-wireless-charging-pad-choose.jpg',
$tip$A good wireless pad charges safely without overheating.

1. Look for Qi certification.
2. Choose a pad with the watts your phone supports (often 7.5W to 15W).
3. Use the adapter the pad recommends. Weak adapters make pads switch on and off.
4. Pads with a fan or good cooling keep phones cooler.
5. Check it has foreign object detection: it stops charging if coins or keys are on it.

Remove thick cases and card holders before charging.$tip$,
ARRAY[]::text[], now() - interval '128 minutes'),

('hardware-tip-solar-chargers-phones', 'HARDWARE', 'Charging Outdoors: Solar Chargers for Phones', 'All brands', '', NULL, '/tips/hw-solar-chargers-phones.jpg',
$tip$Solar chargers help in places with little power.

1. Panels of 10W or more charge phones in good sun. Small panels on power banks are very slow.
2. Charge a power bank from the panel during the day, then the phone from the bank at night. It is more reliable.
3. Point the panel straight at the sun and move it as the sun moves.
4. Keep the phone in the shade while it charges. Heat stops charging.
5. Clouds reduce charging a lot.

Check panels for a regulated USB output so phones get steady power.$tip$,
ARRAY['Solar panel with USB'], now() - interval '130 minutes'),

('hardware-tip-test-adapter-output-multimeter', 'HARDWARE', 'Test an Adapter''s Output with a Multimeter', 'All brands', '', NULL, '/tips/hw-test-adapter-output-multimeter.jpg',
$tip$For technicians: check if a charger or adapter works before blaming the phone or laptop.

1. Set the multimeter to DC volts.
2. For a laptop barrel adapter: put the red probe inside the plug and the black on the outside sleeve. Read the voltage.
3. Compare with the label (for example 19.5V). Much lower or 0V means the adapter is faulty.
4. For USB chargers, a USB meter is easier and shows current too.
5. Note that some USB-C chargers show 5V until a device asks for more.

A reading that jumps around also points to a failing adapter.$tip$,
ARRAY['Multimeter'], now() - interval '132 minutes'),

('hardware-tip-old-feature-phone-batteries', 'HARDWARE', 'Old Feature Phone Batteries: Replacing and Storing', 'All brands', '', NULL, '/tips/hw-old-feature-phone-batteries.jpg',
$tip$Many people still rely on keypad phones as backups.

1. Their removable batteries are easy to replace. Match the model code printed on the battery.
2. Avoid very cheap copies that swell or die quickly.
3. Store a spare backup phone half charged, and charge it every few months.
4. Remove the battery if storing the phone for a long time.
5. Swollen batteries should be replaced and disposed of safely.

A charged keypad phone is a handy backup during power cuts and travel.$tip$,
ARRAY[]::text[], now() - interval '134 minutes'),

('hardware-tip-battery-limits-cold-heat', 'HARDWARE', 'Phone Switches Off in Heat or Cold: Battery Limits', 'All brands', '', NULL, '/tips/hw-battery-limits-cold-heat.jpg',
$tip$Lithium batteries work best between about 0 and 35°C.

1. In strong heat (sun on a dashboard), phones slow down, stop charging or switch off to protect themselves.
2. In cold (fridges, cold stores), old batteries can't supply enough power and the phone dies early.
3. Let the phone return to room temperature before charging or using heavily.
4. Never cool a hot phone in a fridge.

If the phone switches off at normal temperatures, the battery is likely worn.$tip$,
ARRAY[]::text[], now() - interval '136 minutes'),

('hardware-tip-battery-health-after-two-years', 'HARDWARE', 'Phone Battery Health After Two Years: What to Expect', 'All brands', '', NULL, '/tips/hw-battery-health-after-two-years.jpg',
$tip$Batteries slowly lose capacity with every charge.

1. After about two years of daily charging, many batteries hold around 75 to 85% of their original charge.
2. Heavy gaming, fast charging and heat speed this up.
3. Below about 80%, most people notice the phone needs charging more often.
4. A new battery makes an older phone feel new again, and costs much less than a new phone.

Check battery health in settings (see our battery health tip).$tip$,
ARRAY[]::text[], now() - interval '138 minutes'),

('hardware-tip-laptop-motherboard-faults', 'HARDWARE', 'Laptop Motherboard Faults: Common Signs', 'All brands', '', NULL, '/tips/hw-laptop-motherboard-faults.jpg',
$tip$When simple fixes don't help, the laptop's board may be at fault.

Signs:
1. No power at all with a good charger and battery.
2. Power light on but no picture on screen or external monitor.
3. Charging only works on the charger, never the battery, after replacing both.
4. Shuts down randomly even when cool.
5. Burnt smell after a spill or power surge.

A board technician measures power lines and finds the faulty part. Many board faults (charging circuit, shorted capacitor) are repairable for less than a new board.$tip$,
ARRAY['Multimeter', 'DC power supply'], now() - interval '140 minutes'),

('hardware-tip-old-phones-as-backups', 'HARDWARE', 'Keep an Old Phone Working as a Backup', 'All brands', '', NULL, '/tips/hw-old-phones-as-backups.jpg',
$tip$An old phone in a drawer can save the day.

1. Charge it every few months so the battery doesn't die completely.
2. Keep a charger with it.
3. Update it when you charge it.
4. Use it as a backup for calls during repairs, a hotspot, a music player or a kids' phone.
5. If you sell or give it away, sign out of all accounts and reset it first.

If the battery is swollen, have it removed safely.$tip$,
ARRAY[]::text[], now() - interval '142 minutes'),

('hardware-tip-dropped-phone-checklist', 'HARDWARE', 'Dropped Phone Checklist: What to Test After a Fall', 'All brands', '', NULL, '/tips/hw-dropped-phone-checklist.jpg',
$tip$After a drop, check everything, even if the screen looks fine.

1. Look for cracks at the screen corners and the back.
2. Test touch across the whole screen.
3. Take photos with every camera, and check focus.
4. Make a call: test earpiece, microphone and speaker.
5. Check charging and the cable fit.
6. Check that the screen sits flat (a lifting screen can mean a damaged battery).
7. Watch for heat or fast battery drain over the next few days.

Fix small cracks early: they spread and let dust and water in.$tip$,
ARRAY[]::text[], now() - interval '144 minutes'),

('hardware-tip-daily-habits-phones-last', 'HARDWARE', 'Daily Habits That Make Phones Last Longer', 'All brands', '', NULL, '/tips/hw-daily-habits-phones-last.jpg',
$tip$Simple habits avoid most repairs.

1. Use a good case and a tempered glass protector.
2. Don't charge under pillows or in the sun.
3. Use good chargers and cables.
4. Keep the phone away from water, steam and sweat.
5. Keep it in its own pocket, away from keys and coins.
6. Don't use it while it charges in bed.
7. Clean the charging port and speaker grilles gently every few months.
8. Back up photos regularly.

A phone treated well can easily last three or four years.$tip$,
ARRAY[]::text[], now() - interval '146 minutes'),

('hardware-tip-phone-restarting-hardware-causes', 'HARDWARE', 'Phone Restarting by Itself: Hardware Causes', 'All brands', '', NULL, '/tips/hw-phone-restarting-hardware-causes.jpg',
$tip$Random restarts are often hardware, not software.

Common hardware causes:
1. Worn battery that can't supply peak power, especially when opening the camera.
2. Stuck power button, sometimes pressed by a tight case.
3. Overheating.
4. Loose battery connector after a drop.
5. Corrosion after water.
6. Failing storage chip.

Try first: remove the case, update the phone, check battery health and safe mode. If it still restarts, have the battery and buttons checked.$tip$,
ARRAY[]::text[], now() - interval '148 minutes')
ON CONFLICT ("id") DO NOTHING;
