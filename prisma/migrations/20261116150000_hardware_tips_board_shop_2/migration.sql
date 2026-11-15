-- One-time content load (no schema change): 26 hardware tips on board work, tools and running a repair shop,
-- each with its own photo from public/tips (free Pexels photos).
-- Fixed ids + ON CONFLICT DO NOTHING: added once, admin edits never overwritten.

INSERT INTO "RepairGuide" ("id", "category", "title", "brand", "modelName", "videoUrl", "thumbnail", "content", "toolsUsed", "createdAt") VALUES
('hardware-tip-desoldering-without-lifting-pads', 'HARDWARE', 'Desoldering Without Lifting Pads', 'All brands', '', NULL, '/tips/hw-desoldering-without-lifting-pads.jpg',
$tip$Lifted pads turn a simple part swap into a jumper wire job.

1. Always add fresh flux before desoldering.
2. Add a little fresh leaded solder to old lead free joints. It lowers the melting point.
3. Heat both ends of small parts at once (two irons, tweezers iron or hot air) so nothing is pulled while one side is still solid.
4. Never pull a part before all its solder has melted.
5. Use solder wick gently, letting heat do the work, and don't drag it.
6. Keep the iron temperature sensible, not maximum.

Patience is the most important tool for board work.$tip$,
ARRAY['Soldering iron', 'Flux', 'Solder wick', 'Hot air station'], now() - interval '150 minutes'),

('hardware-tip-practise-soldering-old-boards', 'HARDWARE', 'Practise Board Soldering on Old Phones First', 'All brands', '', NULL, '/tips/hw-practise-soldering-old-boards.jpg',
$tip$Learn on dead boards, not customer phones.

1. Collect dead boards from phones that can't be repaired (with the owner's permission).
2. Practise removing and refitting small capacitors and resistors.
3. Practise replacing connectors and charging ports.
4. Practise jumper wires on broken traces.
5. Check every job under the microscope and with a multimeter.
6. Time yourself and aim for clean, shiny joints.

After a few weeks of practice, real repairs become much less stressful.$tip$,
ARRAY['Dead phone boards', 'Soldering station', 'Microscope'], now() - interval '152 minutes'),

('hardware-tip-tinning-wires-before-soldering', 'HARDWARE', 'Tinning Wires Before Soldering', 'All brands', '', NULL, '/tips/hw-tinning-wires-before-soldering.jpg',
$tip$Tinning means coating a wire or pad with solder before joining. It makes joints quick and strong.

1. Strip a short length of insulation.
2. Twist the strands together.
3. Add flux, then touch the iron and a little solder to the wire until it is coated.
4. Tin the pad on the board the same way.
5. Hold the wire on the pad and touch with the iron briefly. They join instantly.

Tinned joints need less heat, which protects the board.$tip$,
ARRAY['Soldering iron', 'Solder', 'Flux'], now() - interval '154 minutes'),

('hardware-tip-lead-free-vs-leaded-solder', 'HARDWARE', 'Lead-Free vs Leaded Solder for Repairs', 'All brands', '', NULL, '/tips/hw-lead-free-vs-leaded-solder.jpg',
$tip$Factories use lead free solder. Many repair technicians prefer leaded solder for reworking.

Leaded solder:
1. Melts at a lower temperature (around 183°C).
2. Flows easily and makes shiny joints.
3. Contains lead: wash hands and don't eat at the bench.

Lead free solder:
1. Melts higher (around 217°C or more).
2. Needs more heat, which stresses boards.

Tip: mixing a little leaded solder into lead free joints makes them easier to remove. Always use a fume extractor.$tip$,
ARRAY[]::text[], now() - interval '156 minutes'),

('hardware-tip-cold-solder-joints', 'HARDWARE', 'Cold Solder Joints: How to Spot Them', 'All brands', '', NULL, '/tips/hw-cold-solder-joints.jpg',
$tip$A cold joint looks connected but isn't reliable.

Signs:
1. Dull, grainy or cracked surface.
2. A ball of solder sitting on the pad instead of flowing smoothly onto it.
3. A fault that comes and goes when pressing the area.

Fix:
1. Add flux.
2. Reheat the joint until the solder flows smoothly onto both the pad and the part.
3. Add a tiny bit of fresh solder if needed.
4. Clean the flux and check under the microscope.

Good joints are smooth and shiny with a slight curve.$tip$,
ARRAY['Microscope', 'Flux', 'Soldering iron'], now() - interval '158 minutes'),

('hardware-tip-inspecting-boards-microscope', 'HARDWARE', 'Inspecting Boards Under a Microscope: What to Look For', 'All brands', '', NULL, '/tips/hw-inspecting-boards-microscope.jpg',
$tip$A careful look finds many faults before any measuring.

1. Corrosion: white, green or blue deposits.
2. Missing parts: an empty pair of pads where a small part should be.
3. Cracked parts: lines across capacitors or chips.
4. Burnt parts: dark or bubbled spots.
5. Bridges: solder joining pins that should be separate.
6. Previous repairs: excess flux, glue or jumper wires.

Compare with a photo of a good board of the same model if you can.$tip$,
ARRAY['Microscope', 'Brush', 'Isopropyl alcohol'], now() - interval '160 minutes'),

('hardware-tip-clearing-solder-bridges', 'HARDWARE', 'Bridged Pins: Clearing Solder Bridges', 'All brands', '', NULL, '/tips/hw-clearing-solder-bridges.jpg',
$tip$A solder bridge joins pins that should be separate, causing shorts or faults.

1. Add plenty of flux to the bridged pins.
2. Drag a clean, tinned iron tip along the pins, away from the chip. The flux pulls solder onto the pads.
3. If there is too much solder, lay solder wick over the bridge and heat it to soak up the excess.
4. Clean flux and check each pin under the microscope.
5. Measure with a multimeter to confirm the short is gone.

Most bridges come from too much solder. Use less than you think.$tip$,
ARRAY['Flux', 'Soldering iron', 'Solder wick'], now() - interval '162 minutes'),

('hardware-tip-holding-small-parts-soldering', 'HARDWARE', 'Holding Small Parts Steady While Soldering', 'All brands', '', NULL, '/tips/hw-holding-small-parts-soldering.jpg',
$tip$Small parts move or fly away when you solder them.

1. Use fine tweezers to hold the part in place.
2. Tack one side first with a tiny bit of solder, then solder the other side, then reflow the first.
3. Use flux: its stickiness holds small parts.
4. Helping hands or a board holder keep wires and boards steady.
5. Use low hot air flow so parts aren't blown away.
6. Work over a tray so dropped parts can be found.

Small capacitors are very hard to find once dropped on the floor.$tip$,
ARRAY['Helping hands', 'Tweezers', 'Heat resistant tape'], now() - interval '164 minutes'),

('hardware-tip-keypad-phone-buttons', 'HARDWARE', 'Keypad Phones: Buttons Not Working', 'All brands', '', NULL, '/tips/hw-keypad-phone-buttons.jpg',
$tip$Keypad buttons stop working when dirt or moisture gets between the rubber and the board.

1. Open the phone carefully (many keypad phones have clip on covers).
2. Remove the keypad rubber.
3. Clean the gold contacts on the board with isopropyl alcohol and a soft brush.
4. Clean the back of the rubber keys too.
5. Let it dry fully and reassemble.

If one key is completely dead, its contact pad may be corroded or the dome under it broken. A new keypad membrane fixes it.$tip$,
ARRAY['Screwdriver set', 'Isopropyl alcohol', 'Soft brush'], now() - interval '166 minutes'),

('hardware-tip-cleaning-keypad-phones', 'HARDWARE', 'Cleaning Keypad Phones Safely', 'All brands', '', NULL, '/tips/hw-cleaning-keypad-phones.jpg',
$tip$Keypad phones collect dirt in every gap.

1. Switch off and remove the battery.
2. Brush between the keys with a dry soft toothbrush.
3. Wipe the keypad and screen with a cloth lightly dampened with isopropyl alcohol.
4. Don't spray liquid onto the phone.
5. Clean the battery contacts with a dry cloth.

Regular cleaning keeps keys responsive and stops dirt reaching the board.$tip$,
ARRAY['Soft cloth', 'Isopropyl alcohol', 'Toothbrush'], now() - interval '168 minutes'),

('hardware-tip-removing-stripped-screws', 'HARDWARE', 'Stripped Screws: How to Remove Them', 'All brands', '', NULL, '/tips/hw-removing-stripped-screws.jpg',
$tip$A stripped screw head is a common headache.

1. Use the exact right bit size. A fresh bit often grips where an old one slipped.
2. Put a small piece of rubber band between the bit and the screw for extra grip.
3. Press down firmly and turn slowly.
4. Thread lock can be softened by touching the screw with a hot soldering iron for a few seconds.
5. As a last resort, a tiny rotary tool can cut a new slot for a flat screwdriver, but take care around the board.

Replace damaged screws with new ones of the same size.$tip$,
ARRAY['Correct screwdriver bit', 'Rubber band', 'Soldering iron'], now() - interval '170 minutes'),

('hardware-tip-measuring-current-multimeter', 'HARDWARE', 'Measuring Current Draw with a Multimeter', 'All brands', '', NULL, '/tips/hw-measuring-current-multimeter.jpg',
$tip$Measuring current shows how much power a device uses, which helps find leaks and faults.

1. Move the red probe to the current socket (mA or A) on the meter.
2. Set the dial to the current range.
3. Break the circuit and connect the meter in series, so the current flows through it.
4. Start on the highest range and go lower.
5. Move the red probe back to the voltage socket when done. Forgetting this blows the meter's fuse on the next voltage test.

For phones, a DC power supply with a current display is easier and safer.$tip$,
ARRAY['Multimeter'], now() - interval '172 minutes'),

('hardware-tip-setting-up-repair-counter', 'HARDWARE', 'Setting Up a Phone Repair Counter Customers Trust', 'All brands', '', NULL, '/tips/hw-setting-up-repair-counter.jpg',
$tip$A tidy, open counter builds trust.

1. Keep the counter clean, well lit and organised.
2. Show your prices for common repairs clearly.
3. Let customers see repairs being done where possible.
4. Keep customer phones in labelled trays, never loose.
5. Use job cards and receipts for every phone.
6. Display your phone number, WhatsApp and opening hours.
7. Keep certificates and supplier warranties ready to show.

Customers come back to shops that feel professional and honest.$tip$,
ARRAY[]::text[], now() - interval '174 minutes'),

('hardware-tip-buying-parts-market-checks', 'HARDWARE', 'Buying Parts at the Market: Checks Before You Pay', 'All brands', '', NULL, '/tips/hw-buying-parts-market-checks.jpg',
$tip$Market parts can be good value or a waste of money.

1. Bring a test phone and connect screens, batteries and ports before paying where possible.
2. Check the exact model and version.
3. Look for physical damage, bent flexes and missing parts.
4. Ask about returns and warranty, and get a receipt with the date.
5. Stick to sellers who have treated you well before.
6. Very cheap "original" parts are usually copies.

Keep notes of which sellers' parts give fewer comebacks.$tip$,
ARRAY['Test phone', 'USB meter'], now() - interval '176 minutes'),

('hardware-tip-testing-phone-with-customer', 'HARDWARE', 'Testing a Phone in Front of the Customer', 'All brands', '', NULL, '/tips/hw-testing-phone-with-customer.jpg',
$tip$Testing together at pickup avoids "it was working before" arguments.

1. Before the repair, test with the customer and write down what works.
2. After the repair, show them the fixed part working.
3. Let them test calls, camera, charging and touch before they leave.
4. Point out anything that was already faulty.
5. Explain the warranty clearly.

This takes a few minutes and saves hours of disputes.$tip$,
ARRAY[]::text[], now() - interval '178 minutes'),

('hardware-tip-refurbished-iphones-checks', 'HARDWARE', 'Refurbished iPhones: What to Check', 'Apple', '', NULL, '/tips/hw-refurbished-iphones-checks.jpg',
$tip$Refurbished and used iPhones are popular. Check them carefully.

1. Settings, General, About: look for the "Parts and Service History" section on newer iPhones. It shows replaced screens, batteries or cameras.
2. Check battery health.
3. Test Face ID or Touch ID.
4. Make sure Find My is off and the phone is not linked to someone else's Apple ID. The seller must sign out in front of you.
5. Check the IMEI matches the box, and that the phone isn't reported stolen or blocked.
6. Test every camera, speaker, microphone and button.

Never buy an iPhone that is still locked to someone else's account.$tip$,
ARRAY[]::text[], now() - interval '180 minutes'),

('hardware-tip-phone-slow-hardware-reasons', 'HARDWARE', 'Phone Getting Slow: Hardware Reasons', 'All brands', '', NULL, '/tips/hw-phone-slow-hardware-reasons.jpg',
$tip$Phones slow down for hardware reasons too, not only apps.

1. Full storage: phones slow down badly when storage is nearly full. Keep at least 10% free.
2. Worn battery: some phones slow the processor to avoid shutdowns.
3. Heat: a hot phone slows itself to cool down.
4. Failing storage chip: very slow, freezing phones after years of use.
5. Old phones simply struggle with newer apps.

Free up storage, check battery health and keep the phone cool before deciding it needs replacing.$tip$,
ARRAY[]::text[], now() - interval '182 minutes'),

('hardware-tip-phone-storage-full-options', 'HARDWARE', 'Phone Storage Full: Hardware Options', 'All brands', '', NULL, '/tips/hw-phone-storage-full-options.jpg',
$tip$When storage is full, you have several choices.

1. Move photos and videos to a computer or cloud storage.
2. If the phone has a memory card slot, add a good microSD card and set the camera to save there.
3. Use an OTG flash drive to move files off the phone.
4. Delete large videos and downloaded files you no longer need.

Internal storage can't be upgraded on modern phones, so choose enough storage when buying.$tip$,
ARRAY['Memory card', 'OTG flash drive', 'Computer'], now() - interval '184 minutes'),

('hardware-tip-phone-stands-desk', 'HARDWARE', 'Phone Stands at the Desk: Save Your Neck and Your Phone', 'All brands', '', NULL, '/tips/hw-phone-stands-desk.jpg',
$tip$A simple stand keeps the phone off the table, away from spills, and at eye level.

1. Use a stand for video calls, recipes and following repair guides.
2. Stands keep the phone upright so the speaker isn't muffled by the table.
3. A charging stand keeps the cable from bending sharply.
4. Keep drinks away from the stand.

A stand also stops the phone getting knocked off the desk.$tip$,
ARRAY[]::text[], now() - interval '186 minutes'),

('hardware-tip-photographing-phones-for-selling', 'HARDWARE', 'Photographing Phones and Parts for Selling Online', 'All brands', '', NULL, '/tips/hw-photographing-phones-for-selling.jpg',
$tip$Good photos sell faster and build trust.

1. Use daylight from a window, not harsh flash.
2. Use a plain, clean background.
3. Clean the phone or part first and remove fingerprints.
4. Show the front, back, sides and any marks honestly.
5. Show the screen switched on, and the IMEI or model screen for phones.
6. Keep photos sharp and not too zoomed in.

Honest photos avoid returns and complaints.$tip$,
ARRAY['Phone camera', 'Plain background'], now() - interval '188 minutes'),

('hardware-tip-keeping-repair-log', 'HARDWARE', 'Keeping a Repair Log for Every Job', 'All brands', '', NULL, '/tips/hw-keeping-repair-log.jpg',
$tip$A repair log helps the business and your skills.

Record for each job:
1. Date, customer name and phone number.
2. Phone model and IMEI.
3. Fault reported and fault found.
4. Parts used, supplier and cost.
5. Price charged and warranty.
6. Notes on tricky steps.

Over time the log shows which models you repair most, which parts fail, and which suppliers are reliable.$tip$,
ARRAY['Notebook or spreadsheet'], now() - interval '190 minutes'),

('hardware-tip-when-repair-not-worth-it', 'HARDWARE', 'When a Repair Isn''t Worth It: Honest Advice', 'All brands', '', NULL, '/tips/hw-when-repair-not-worth-it.jpg',
$tip$Sometimes the honest answer is "don't repair it".

1. If the repair costs close to the phone's value, say so.
2. Heavy water damage with many faults rarely lasts after repair.
3. Very old phones may not get updates or run current apps well.
4. Offer data recovery or backup instead of a full repair.
5. Suggest a good value replacement if needed.

Customers remember honest advice and come back.$tip$,
ARRAY[]::text[], now() - interval '192 minutes'),

('hardware-tip-repairing-remote-controls-toys', 'HARDWARE', 'Repairing Small Electronics: Remote Controls and Toys', 'All brands', '', NULL, '/tips/hw-repairing-remote-controls-toys.jpg',
$tip$Many small electronics fail for simple reasons.

1. Leaking batteries corrode contacts. Clean them with a little vinegar or isopropyl alcohol, then dry.
2. Sticky buttons on remotes: open and clean the rubber pads and board contacts.
3. Broken wires near battery springs can be resoldered.
4. Test infrared remotes with a phone camera: the light at the front flashes when a button is pressed.
5. Remove batteries from items stored for a long time.

These quick jobs build skills and bring customers into the shop.$tip$,
ARRAY['Screwdriver set', 'Isopropyl alcohol', 'Multimeter'], now() - interval '194 minutes'),

('hardware-tip-selling-accessories-with-repairs', 'HARDWARE', 'Selling Accessories Alongside Repairs', 'All brands', '', NULL, '/tips/hw-selling-accessories-with-repairs.jpg',
$tip$Every repair is a chance to protect the phone better.

1. Offer a screen protector after a screen repair.
2. Offer a good case after a drop damage repair.
3. Offer a quality charger and cable after a charging port repair.
4. Don't push: explain how it prevents the same repair.
5. Stock good quality items you can stand behind.

Customers appreciate advice that saves them money later.$tip$,
ARRAY[]::text[], now() - interval '196 minutes'),

('hardware-tip-cleaning-game-controller', 'HARDWARE', 'Cleaning a Game Controller', 'All brands', '', NULL, '/tips/hw-cleaning-game-controller.jpg',
$tip$Controllers get greasy and dirty fast.

1. Unplug it and remove batteries.
2. Wipe the shell with a cloth lightly dampened with isopropyl alcohol.
3. Clean the gaps around buttons and sticks with a cotton bud.
4. Brush dust from the ports and around the triggers.
5. Let it dry fully before charging or using it.

Clean hands and no snacks while gaming keep controllers working longer.$tip$,
ARRAY['Isopropyl alcohol', 'Cotton buds', 'Soft brush'], now() - interval '198 minutes'),

('hardware-tip-phone-hot-in-pocket', 'HARDWARE', 'Phone Feels Hot in the Pocket: Hardware Causes', 'All brands', '', NULL, '/tips/hw-phone-hot-in-pocket.jpg',
$tip$A phone that heats up when not in use has something working too hard.

1. Check Battery settings for an app using power in the background.
2. Turn off hotspot, Bluetooth and location when not needed.
3. A weak signal makes the phone work harder to stay connected.
4. A worn or swollen battery heats up more.
5. A shorted part on the board after a drop or water can cause steady heat.

If the phone is hot even when switched off, remove it from your pocket and have it checked straight away.$tip$,
ARRAY[]::text[], now() - interval '200 minutes')
ON CONFLICT ("id") DO NOTHING;
