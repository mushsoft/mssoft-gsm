-- One-time content load (no schema change): 25 hardware tips on batteries and charging,
-- each with its own photo from public/tips (free Pexels photos).
-- Fixed ids + ON CONFLICT DO NOTHING: added once, admin edits never overwritten.

INSERT INTO "RepairGuide" ("id", "category", "title", "brand", "modelName", "videoUrl", "thumbnail", "content", "toolsUsed", "createdAt") VALUES
('hardware-tip-swollen-battery-signs', 'HARDWARE', 'Signs of a Swollen Battery and What to Do Right Away', 'All brands', '', NULL, '/tips/hw-swollen-battery-signs.jpg',
$tip$A swollen lithium battery is a fire risk. Know the signs.

Signs:
1. The screen is lifting from the frame, or the back cover is popping open.
2. The phone rocks when laid flat on a table.
3. Ghost touch or pressure marks on the screen.
4. The phone is warm even when not in use, or the battery drains very fast.

What to do:
1. Stop charging the phone immediately.
2. Back up the phone if it still works.
3. Don't press, bend or puncture the battery, and don't try to "let the gas out".
4. Bring it to a technician to remove the battery. Keep it away from heat and sunlight until then.
5. Store a removed swollen battery in a metal box or sand tray, away from anything that burns, until it is disposed of properly.

Never charge a phone that has a swollen battery overnight next to your bed.$tip$,
ARRAY['Fireproof container or sand tray'], now() - interval '52 minutes'),

('hardware-tip-check-battery-health', 'HARDWARE', 'Check Battery Health on Android and iPhone', 'All brands', '', NULL, '/tips/hw-check-battery-health.jpg',
$tip$Battery health tells you how much charge the battery can still hold compared with when it was new.

iPhone:
1. Open Settings, Battery, Battery Health and Charging.
2. Maximum Capacity under about 80% means it is time for a new battery.
3. "Service" shown here means the battery should be replaced.

Android:
1. Many Samsung phones show battery status in the Samsung Members app, under Support, Phone diagnostics.
2. Some phones show it in Settings, Battery, Battery health.
3. On others, dial the phone's test code or use a battery app over a few days to estimate capacity.

Real signs a battery is worn out, whatever the number says:
1. The phone dies at 15 to 30%.
2. It can't last half a day with normal use.
3. It restarts when you open the camera or play games.

Batteries normally last about 2 to 3 years of daily charging.$tip$,
ARRAY[]::text[], now() - interval '54 minutes'),

('hardware-tip-removing-glued-battery-safely', 'HARDWARE', 'Removing a Glued Battery Safely: No Metal Tools', 'All brands', '', NULL, '/tips/hw-removing-glued-battery-safely.jpg',
$tip$Phone batteries are held by strong glue. A punctured battery can catch fire in seconds.

1. Discharge the battery to below 25% before removing it. A fuller battery burns more strongly.
2. Disconnect the battery connector first.
3. If the battery has pull tabs, pull them slowly and low, almost flat, so they stretch instead of tearing.
4. If the tabs break, drip a little isopropyl alcohol under the battery edge and wait a minute to soften the glue.
5. Slide a plastic card under the battery and work it slowly. Never use a metal tool to pry it.
6. Never bend the battery. A bent battery can short inside even if it looks fine.
7. Keep a fireproof tray or sand nearby. If a battery starts smoking, put it in the tray and move away.

Fit the new battery with new adhesive, connect it last, and close the phone.$tip$,
ARRAY['Plastic cards', 'Isopropyl alcohol', 'Fireproof tray', 'Battery pull tabs'], now() - interval '56 minutes'),

('hardware-tip-battery-myths', 'HARDWARE', 'Battery Myths: Overnight Charging, Draining to 0% and More', 'All brands', '', NULL, '/tips/hw-battery-myths.jpg',
$tip$Lithium batteries don't work like the old nickel batteries, so some old advice is now harmful.

Myth: drain to 0% before charging. Fact: deep discharges wear modern batteries faster. Charge when you can.
Myth: charge to 100% every time. Fact: keeping a battery between about 20% and 80% gives it the longest life. Many phones have an "optimised" or "protect battery" option that limits charging.
Myth: overnight charging destroys the battery. Fact: phones stop charging at 100%, but sitting full and warm all night does add wear. Use optimised charging and don't charge under a pillow.
Myth: any charger is fine. Fact: cheap fake chargers can overheat and damage the charging circuit.
Myth: put a battery in the fridge. Fact: cold and condensation can harm it. Store at room temperature.

Heat is the biggest enemy of batteries: avoid charging in the sun or while gaming hard.$tip$,
ARRAY[]::text[], now() - interval '58 minutes'),

('hardware-tip-fake-replacement-batteries', 'HARDWARE', 'Spotting Fake or Low Capacity Replacement Batteries', 'All brands', '', NULL, '/tips/hw-fake-replacement-batteries.jpg',
$tip$Many cheap replacement batteries claim a big capacity but hold much less.

Warning signs:
1. Capacity printed much higher than the original (a "6000mAh" battery for a phone that came with 3000mAh).
2. Very light weight compared with the original.
3. Blurry printing, spelling mistakes or no batch code.
4. The phone shows 100% quickly and then drops fast.

How to test:
1. Fully charge the phone, then use it normally and compare battery life with the customer's expectations.
2. Charge from about 10% to full through a USB meter and read the mAh it took in. A real battery takes in close to its rating.
3. Compare with the original battery side by side.

Buy batteries from suppliers who give a warranty and stand behind returns. A good battery costs more but brings fewer comebacks.$tip$,
ARRAY['USB meter'], now() - interval '60 minutes'),

('hardware-tip-battery-drains-when-off', 'HARDWARE', 'Battery Drains Even When Switched Off', 'All brands', '', NULL, '/tips/hw-battery-drains-when-off.jpg',
$tip$If a phone loses a lot of charge while switched off, something is leaking current, or the battery itself is worn.

1. Charge to full, switch off, and check after 12 hours. Losing a few percent is normal. Losing most of it is not.
2. Fit a known good battery and repeat. If the drain stops, the old battery was the problem.
3. If it continues, connect the board to a DC power supply with the phone off. A working phone draws almost nothing when off.
4. A steady current draw when off points to a leaking part, often a shorted capacitor or a water damaged area.
5. Look for corrosion first, especially if the phone was ever wet.

Board level leakage needs a board technician with a power supply and thermal camera or rosin to find the warm part.$tip$,
ARRAY['DC power supply', 'Multimeter'], now() - interval '62 minutes'),

('hardware-tip-choosing-power-bank', 'HARDWARE', 'Choosing a Real Power Bank: mAh, Output and Fake Ratings', 'All brands', '', NULL, '/tips/hw-choosing-power-bank.jpg',
$tip$Power banks are often sold with fake capacity labels. Here is how to choose a good one.

1. Real 10,000mAh banks weigh about 180 to 250g. A very light "30,000mAh" bank is fake.
2. Expect to get about 60 to 70% of the printed capacity into the phone. That is normal because of conversion losses.
3. Check the output: 5V 2A is basic, 18W or more with PD or QC charges phones faster.
4. Prefer a bank with USB-C in and out. It charges faster and works with newer phones.
5. Look for protection marks and a known brand with a warranty.
6. Avoid banks that get very hot or swell. Swelling means stop using it at once.

For long power cuts, a good 20,000mAh bank can charge a phone three or four times.$tip$,
ARRAY['USB meter'], now() - interval '64 minutes'),

('hardware-tip-power-bank-care', 'HARDWARE', 'Power Bank Care: Make It Last Longer', 'All brands', '', NULL, '/tips/hw-power-bank-care.jpg',
$tip$A good power bank can last years if you treat it well.

1. Recharge it every couple of months even if you don't use it. Lithium cells left empty for long can die.
2. Don't leave it in a hot car or in the sun.
3. Use a good cable and charger to fill it. Weak chargers make it charge slowly and get warm.
4. Don't charge the bank and a phone from it at the same time often (pass through charging). It adds heat.
5. Keep it away from water and don't drop it. Dents can damage the cells inside.
6. Stop using it if it swells, smells, hisses or gets very hot.

Swollen or damaged power banks should be taken for proper disposal, not thrown in a fire or ordinary rubbish.$tip$,
ARRAY[]::text[], now() - interval '66 minutes'),

('hardware-tip-storing-spare-batteries', 'HARDWARE', 'Storing Spare Phone Batteries in the Shop', 'All brands', '', NULL, '/tips/hw-storing-spare-batteries.jpg',
$tip$A shop with dozens of spare batteries needs to store them safely.

1. Keep batteries at about 40 to 60% charge for storage. Most new batteries come that way.
2. Store them in a cool, dry place out of sunlight. Not on top of a hot router or under a tin roof.
3. Keep each battery in its own bag or box so connectors can't touch metal and short.
4. Don't stack heavy items on batteries.
5. Use old stock first. Batteries lose capacity even on the shelf.
6. Keep damaged, swollen or customer removed batteries in a separate metal container until disposal.
7. Keep a fire extinguisher (CO2 or powder) and a sand bucket in the workshop.

Check stored batteries every few months and top up any that are very low.$tip$,
ARRAY['Plastic bags or boxes', 'Metal cabinet'], now() - interval '68 minutes'),

('hardware-tip-battery-percentage-jumps', 'HARDWARE', 'Battery Percentage Jumps or Phone Dies at 20%', 'All brands', '', NULL, '/tips/hw-battery-percentage-jumps.jpg',
$tip$If the battery jumps from 40% to 10%, or the phone switches off with charge left, the battery is usually worn out.

1. Check battery health (see our battery health tip).
2. Restart the phone and update it. A software bug can sometimes show the wrong percentage.
3. Let the phone run down until it switches off once, then charge it to 100% without interruption. This helps the phone re-learn the battery level. Don't do this often.
4. If the problem continues, replace the battery.
5. If a new battery does the same, check the battery connector and the battery data lines on the board.

Cold weather can also make worn batteries die early. If it happens only in the cold, the battery is still near the end of its life.$tip$,
ARRAY[]::text[], now() - interval '70 minutes'),

('hardware-tip-testing-battery-multimeter', 'HARDWARE', 'Testing a Phone Battery with a Multimeter', 'All brands', '', NULL, '/tips/hw-testing-battery-multimeter.jpg',
$tip$A quick voltage check tells you if a battery is completely flat, normal or faulty.

1. Set the multimeter to DC volts (20V range).
2. Put the probes on the battery's positive and negative contacts. Be careful not to touch both with one metal tool.
3. A healthy lithium phone battery reads about 3.7 to 4.4V depending on charge.
4. Below about 3.0V: deeply discharged. Many phones won't charge it. Try charging on the phone for a while, or replace it.
5. 0V: the battery's protection circuit has cut off or the battery is dead. Replace it.

Voltage alone doesn't show capacity. A battery can read 4.2V and still die fast under load. For a full test, use a battery tester or check how long it lasts.$tip$,
ARRAY['Multimeter'], now() - interval '72 minutes'),

('hardware-tip-hot-phone-battery-problem', 'HARDWARE', 'Hot Phone: When Heat Means a Battery Problem', 'All brands', '', NULL, '/tips/hw-hot-phone-battery-problem.jpg',
$tip$Phones get warm when charging, gaming or using the camera. Too much heat is a warning.

Normal: warm during fast charging or heavy games, cooling down soon after.
Not normal:
1. Hot when idle and not charging.
2. Too hot to hold, or a burning smell.
3. Hot along with fast battery drain or a lifting screen.

What to do:
1. Remove the case and stop charging.
2. Close heavy apps and turn off hotspot.
3. Move out of the sun.
4. If it stays hot when idle, check for a swollen battery or a short on the board. Bring it to a technician.

Never cool a hot phone in a fridge or freezer: moisture can form inside.$tip$,
ARRAY[]::text[], now() - interval '74 minutes'),

('hardware-tip-iphone-battery-unknown-part', 'HARDWARE', 'iPhone Battery "Unknown Part" Message After Replacement', 'Apple', 'iPhone XS and newer', NULL, '/tips/hw-iphone-battery-unknown-part.jpg',
$tip$On newer iPhones, fitting a non Apple battery, or even a genuine battery moved from another phone, can show a battery message and hide the Battery Health percentage.

1. The phone still works and charges normally. The message is information, not a fault.
2. Tell the customer about it before the repair.
3. Some shops use a battery programmer or a "tag on" flex that moves the original battery chip to the new cells, which keeps health showing on many models.
4. Genuine Apple batteries fitted through Apple's own repair process avoid the message.

Never buy batteries that already show "100%" health on a programmer as proof of quality. The number can be written by the programmer and says nothing about the real cells.$tip$,
ARRAY['Battery programmer (optional)'], now() - interval '76 minutes'),

('hardware-tip-battery-stops-at-80', 'HARDWARE', 'Battery Stops Charging at 80%: Fault or Feature?', 'All brands', '', NULL, '/tips/hw-battery-stops-at-80.jpg',
$tip$A phone that stops at 80% or 85% is often protecting its battery on purpose.

1. iPhone: Settings, Battery, Charging. Look for an 80% limit or Optimised Charging.
2. Samsung: Settings, Battery, More battery settings, Protect battery.
3. Other Android: search settings for "battery protection", "smart charging" or "charge limit".
4. Some phones pause at 80% overnight and finish to 100% just before your alarm.

If the setting is off and it still stops early:
1. Try another charger and cable.
2. Restart the phone.
3. Check if the phone is hot. Many phones slow or stop charging when warm.
4. If the battery is old, it may be worn. Check battery health.

Leaving the 80% limit on is good for battery life if your day fits within it.$tip$,
ARRAY[]::text[], now() - interval '78 minutes'),

('hardware-tip-disposing-dead-batteries', 'HARDWARE', 'Disposing of Dead and Swollen Batteries Safely', 'All brands', '', NULL, '/tips/hw-disposing-dead-batteries.jpg',
$tip$Lithium batteries thrown in rubbish can start fires in bins, trucks and dumps.

1. Cover the battery's metal contacts with tape so they can't short.
2. Put each battery in its own small plastic bag.
3. Store them in a metal box or sand bucket, away from heat and flammable things.
4. Never burn, crush or puncture batteries.
5. Take them to an e-waste collection point or electronics recycler. Some phone shops and dealers collect them.
6. Keep a list of how many you send, especially if you run a repair shop.

Old chargers, cables and broken phones also count as e-waste and should go to a recycler, not the dustbin.$tip$,
ARRAY['Tape', 'Metal box or sand'], now() - interval '80 minutes'),

('hardware-tip-clean-charging-port', 'HARDWARE', 'Clean a Charging Port Safely (Lint Is the Usual Culprit)', 'All brands', '', NULL, '/tips/hw-clean-charging-port.jpg',
$tip$Pocket lint packed into the charging port is the most common reason a cable feels loose or charging stops.

1. Switch the phone off.
2. Shine a torch into the port. Look for packed fluff at the back.
3. Gently scrape the lint out with a wooden or plastic toothpick. Work along the walls, not the middle pins.
4. Brush out the loose bits with a dry soft brush.
5. For dirt or sticky stains, dip the brush lightly in 99% isopropyl alcohol and let it dry fully.
6. Never use a metal pin or needle: it can short or bend the pins.

You will often pull out a surprising lump of lint. After cleaning, the cable should click in firmly again.$tip$,
ARRAY['Wooden toothpick', 'Soft brush', 'Isopropyl alcohol', 'Torch'], now() - interval '82 minutes'),

('hardware-tip-loose-cable-in-port', 'HARDWARE', 'Loose Cable in the Port: Worn Port or Worn Cable?', 'All brands', '', NULL, '/tips/hw-loose-cable-in-port.jpg',
$tip$If the cable falls out or charging stops when you move it, find out which part is worn.

1. Clean the port first (see our port cleaning tip).
2. Try a known good cable. If it fits tight, the old cable's connector is worn.
3. Try the old cable in another phone. If it is loose there too, replace the cable.
4. If every cable is loose in this phone, the port's springs are worn or the port is cracked.
5. Look inside with a torch for broken plastic or bent pins.

Replacing a worn cable is cheap. A worn port needs a charging port replacement (see our tip on port boards versus soldered ports).$tip$,
ARRAY['Known good cable', 'Torch'], now() - interval '84 minutes'),

('hardware-tip-charging-port-board-or-soldered', 'HARDWARE', 'Charging Port Board or Soldered Port: Know What You''re Replacing', 'All brands', '', NULL, '/tips/hw-charging-port-board-or-soldered.jpg',
$tip$Phones have two kinds of charging port, and the price and time to fix them differ a lot.

Charging board (sub board): the port sits on a small separate board joined to the main board by a flex cable. Most Samsung, Tecno, Infinix, Xiaomi and many others. Fix: unscrew and swap the whole small board. Quick and safe.

Soldered port: the port is soldered directly onto the main board. Some older phones and certain models. Fix: remove the old port with hot air and solder a new one. Needs skill, a good station and flux.

Before quoting:
1. Look up the model to see which type it has.
2. On sub board phones, the board also often holds the microphone, so test calls after the swap.
3. On soldered ports, check nearby parts for heat damage after the job.

Always disconnect the battery before swapping a charging board.$tip$,
ARRAY['Screwdriver set', 'Soldering station', 'Hot air station', 'Flux'], now() - interval '86 minutes'),

('hardware-tip-fast-charging-stopped', 'HARDWARE', 'Fast Charging Stopped Working: Cable, Adapter or Port', 'All brands', '', NULL, '/tips/hw-fast-charging-stopped.jpg',
$tip$Fast charging needs the right adapter, a good cable, a clean port and a cool phone. Any one missing and the phone falls back to slow charging.

1. Use the original or a known good fast charger. Many cheap adapters don't support fast charging.
2. Change the cable. Thin or damaged cables can't carry fast charging current.
3. Clean the charging port.
4. Check the phone isn't hot. Most phones turn off fast charging when warm.
5. Check settings: some phones let you turn fast charging off.
6. Use a USB meter. Fast charging usually shows 9V or more, or a high current on USB-C.

If all of these are fine and the phone still charges slowly, the charging port or charging circuit on the board may be faulty.$tip$,
ARRAY['USB meter', 'Known good charger and cable'], now() - interval '88 minutes'),

('hardware-tip-fake-chargers', 'HARDWARE', 'Fake Chargers: How to Spot Them and Why They''re Dangerous', 'All brands', '', NULL, '/tips/hw-fake-chargers.jpg',
$tip$Copy chargers look like originals but often skip the safety parts inside.

Warning signs:
1. Much lighter than the original.
2. Blurry print, wrong fonts or spelling mistakes.
3. Pins loose or the case not closing tightly.
4. Gets very hot, buzzes or smells.
5. Very cheap price for a "branded" charger.

Why it matters:
1. Poor insulation can give an electric shock.
2. Unstable voltage can damage the phone's charging IC.
3. They can catch fire, especially left plugged in overnight.

Buy chargers from trusted shops and keep the receipt. A good charger is cheaper than a charging IC repair.$tip$,
ARRAY[]::text[], now() - interval '90 minutes'),

('hardware-tip-usb-c-cables-differ', 'HARDWARE', 'Not All USB-C Cables Are the Same', 'All brands', '', NULL, '/tips/hw-usb-c-cables-differ.jpg',
$tip$Two USB-C cables can look identical but behave very differently.

1. Charging power: basic cables carry up to 60W. Cables for laptops and fast phones may carry 100W or more and have a small chip inside.
2. Data speed: many cheap cables are charge only or USB 2.0 speed. Transferring big files or flashing a phone needs a good data cable.
3. Video: only some cables carry video to a monitor.
4. Quality: thin, cheap cables get hot, charge slowly and break near the plug.

Tips:
1. Keep one known good, well made cable on the bench for testing.
2. For flashing and backups, use a short, good data cable.
3. Label your cables by what they do best.

If a phone isn't detected by a computer, try another cable before suspecting the phone.$tip$,
ARRAY[]::text[], now() - interval '92 minutes'),

('hardware-tip-phone-charges-slowly', 'HARDWARE', 'Phone Charges Slowly: Simple Checks First', 'All brands', '', NULL, '/tips/hw-phone-charges-slowly.jpg',
$tip$Before suspecting the phone, check the simple things.

1. Use a wall charger, not a laptop or car USB port. These give much less power.
2. Try another cable and adapter.
3. Clean the charging port.
4. Close heavy apps and turn off hotspot while charging.
5. Turn on airplane mode to charge faster if you're in a hurry.
6. Let the phone cool. Hot phones charge slower on purpose.
7. Check the battery health. A worn battery may charge strangely.

If the phone still charges slowly with a good charger and cable, measure current with a USB meter. Very low current with a good charger points to the charging port or the charging circuit.$tip$,
ARRAY['USB meter'], now() - interval '94 minutes'),

('hardware-tip-wireless-charging-not-working', 'HARDWARE', 'Wireless Charging Not Working: Case, Position and Coil', 'All brands', '', NULL, '/tips/hw-wireless-charging-not-working.jpg',
$tip$Wireless charging is fussy about position and anything in the way.

1. Remove thick cases, card wallets and magnetic rings. Metal and cards block charging.
2. Centre the phone on the pad. Many pads have a small sweet spot.
3. Use the adapter that came with the pad. Weak adapters make pads stop and start.
4. Check that the phone supports wireless charging at all. Many budget phones don't.
5. Look for a wireless charging on/off option in settings.
6. If wired charging works but wireless never does, the charging coil or its connection may be damaged, often after back glass replacement or a drop.

Wireless charging is slower and warmer than wired. Don't use it on a hot day in the sun.$tip$,
ARRAY[]::text[], now() - interval '96 minutes'),

('hardware-tip-usb-meter-testing', 'HARDWARE', 'Test Chargers and Ports with a USB Meter', 'All brands', '', NULL, '/tips/hw-usb-meter-testing.jpg',
$tip$A USB meter plugs in between the charger and the cable and shows voltage, current and power. It is one of the cheapest and most useful tools for charging faults.

1. Plug the meter into the charger, then the cable into the meter, then the phone.
2. Read the voltage: about 5V for normal charging, 9V or more for fast charging.
3. Read the current: a healthy phone usually draws 1A or more when the battery is low.
4. 0A with 5V present: the phone isn't accepting charge. Check the port, battery and charging circuit.
5. Very high current with the phone off and not charging: possible short on the board.

Use the same meter to test chargers and cables: compare a known good set with the suspect one.$tip$,
ARRAY['USB meter'], now() - interval '98 minutes'),

('hardware-tip-faulty-charging-ic-signs', 'HARDWARE', 'Signs of a Faulty Charging IC', 'All brands', '', NULL, '/tips/hw-faulty-charging-ic-signs.jpg',
$tip$When port, cable, charger and battery are all good but the phone still won't charge properly, the charging IC on the board may be faulty.

Common signs:
1. Charging icon shows but percentage doesn't rise.
2. Phone charges only when switched off.
3. Phone gets hot near one spot on the board when charging.
4. USB meter shows 5V but 0A, even with a new port and battery.
5. Phone was charged with a fake charger before the fault started.

What to do:
1. Rule out the simple parts first: port, cable, charger, battery.
2. Check for corrosion near the charging circuit.
3. Board level work (testing and replacing the IC) needs hot air, flux and a good technician.

Replacing a charging IC is usually cheaper than a new phone if the rest of the board is healthy.$tip$,
ARRAY['USB meter', 'DC power supply', 'Multimeter'], now() - interval '100 minutes')
ON CONFLICT ("id") DO NOTHING;
