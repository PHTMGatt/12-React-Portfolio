// elvenScriptures.jsx
import React from 'react';
import { IoHome } from 'react-icons/io5';  // Updated: Using IoHome instead of BiHandicap
import { GiHobbitDoor, GiBattleAxe, GiElfHelmet, GiWizardStaff, GiSwordsEmblem, GiDevilMask } from 'react-icons/gi';

const contactThemes = [
  // === Default Scroll (only one) ===
  {
    title: 'Contact Me',
    name: 'What name do you go by?',
    namePlaceholder: 'Enter your name, oh traveler...',
    email: 'Send a raven... or, you know, an email',
    emailPlaceholder: 'yourname@example.com',
    subject: 'What brings you here?',
    subjectPlaceholder: 'Share a glimpse of your purpose...',
    message: 'Share your tale, traveler...',
    messagePlaceholder: 'Type your story or inquiry here...',
    button: 'Send Word',
    hover: 'Standard parchment for the Free Folk.',
    icon: <IoHome />,  // Updated icon here
    category: 'Default',
  },

  // === Hobbit Scrolls (4 items) ===
  {
    title: 'Your Name in the Red Book',
    name: 'There and Back Again',
    namePlaceholder: 'In the style of Bilbo Baggins...',
    email: 'ringbearer@shiremail.com',
    emailPlaceholder: 'e.g. bilbo@underhill.me',
    subject: 'Title Your Tale',
    subjectPlaceholder: 'A journey, an adventure, a misadventure...',
    message: 'There, and What You Found',
    messagePlaceholder: 'Share your unexpected discoveries...',
    button: 'Send to Bag End',
    hover: 'A Message by Bilbo Baggins',
    icon: <GiHobbitDoor />,
    category: 'Hobbit',
  },
  {
    title: 'A Hobbit’s Tale',
    name: 'Mr. Baggins Remastered',
    namePlaceholder: 'Perhaps “Underhill” or “Proudfoot”...',
    email: 'frodo@shiremail.com',
    emailPlaceholder: 'e.g. frodo@baggins.net',
    subject: 'Title of This Chapter',
    subjectPlaceholder: 'A gentle stroll, or a perilous quest...',
    message: 'What Will You Leave Behind?',
    messagePlaceholder: 'A keepsake, an heirloom, or a memory...',
    button: 'Send from the Hilltop',
    hover: 'A Tale by Frodo Baggins',
    icon: <GiHobbitDoor />,
    category: 'Hobbit',
  },
  {
    title: 'The Hobbit’s Heart',
    name: 'A Simple Shire Story',
    namePlaceholder: 'Samwise, Merry, or a brand-new name...',
    email: 'samwise@shiremail.com',
    emailPlaceholder: 'e.g. gardener@bagend.lane',
    subject: 'Quiet Courage',
    subjectPlaceholder: 'Small steps lead to great deeds...',
    message: 'Small hands, big heart—journeys begin at home.',
    messagePlaceholder: 'How do you nurture hope in dark times?',
    button: 'Whisper to the Party Tree',
    hover: 'A quiet hero speaks volumes in the Shire.',
    icon: <GiHobbitDoor />,
    category: 'Hobbit',
  },
  {
    title: 'Under the Party Tree',
    name: 'Tales of Unexpected Journeys',
    namePlaceholder: 'Mischief from Pippin, or brand-new mischief...',
    email: 'pippin@shiremail.com',
    emailPlaceholder: 'e.g. secondbreakfast@tookshire.org',
    subject: 'Light-Hearted Mischief',
    subjectPlaceholder: 'A jest, a riddle, or a new escapade...',
    message: 'Every adventure starts with a leap of faith—and a little mischief.',
    messagePlaceholder: 'Share the funniest twist in your travels!',
    button: 'Drop a Note by the Green Dragon',
    hover: 'A merry note from a hobbit with daring dreams.',
    icon: <GiHobbitDoor />,
    category: 'Hobbit',
  },

  // === Dwarf Scrolls (4 items) ===
  {
    title: 'Name of the Line You Bear',
    name: 'Heir of Durin',
    namePlaceholder: 'Fíli, Kíli, or your dwarven lineage...',
    email: 'durinson@erebor.com',
    emailPlaceholder: 'e.g. thorin@underthemountain.org',
    subject: 'Oath or Request',
    subjectPlaceholder: 'A pledge or a need for dwarven might...',
    message: 'Proclaim Your Cause',
    messagePlaceholder: 'Speak forth your reason to awaken Erebor...',
    button: 'Speak Before the Throne ✠',
    hover: 'Scroll to Thorin himself, guarded by Balin and Dwalin.',
    icon: <GiBattleAxe />,
    category: 'Dwarf',
  },
  {
    title: 'Forged in Stone',
    name: 'Name Carved in Stone',
    namePlaceholder: 'Adorn your dwarven name in runes...',
    email: 'ravensmith@ironhills.org',
    emailPlaceholder: 'e.g. dwarf-smith@ironpeak.net',
    subject: 'Summon of Stone',
    subjectPlaceholder: 'Call upon the deep echoes of the mountain...',
    message: 'Your message shall be carved into the mountain.',
    messagePlaceholder: 'What words shall echo in the halls of stone?',
    button: 'Deliver to the Mountain 🔥',
    hover: 'Who dares knock upon the gates of Erebor?',
    icon: <GiBattleAxe />,
    category: 'Dwarf',
  },
  {
    title: 'Anvil’s Echo',
    name: 'Son of Stone',
    namePlaceholder: 'Dwalin, Gloin, or a new dwarven kin...',
    email: 'anvil@ironhills.org',
    emailPlaceholder: 'e.g. forging-steel@mithrilmail.net',
    subject: 'Hammer Your Fate',
    subjectPlaceholder: 'Let the forging of destiny commence...',
    message: 'Let the clanging of hammers mark your destiny.',
    messagePlaceholder: 'Share your quest for dwarven renown...',
    button: 'Strike the Forging Fire',
    hover: 'Every echo of the anvil sings of legacy.',
    icon: <GiBattleAxe />,
    category: 'Dwarf',
  },
  {
    title: 'Rune of the Deep',
    name: 'Keeper of Ancient Runes',
    namePlaceholder: 'A name etched in Khuzdul perhaps?',
    email: 'rune@mountainhome.org',
    emailPlaceholder: 'e.g. runemaster@khazad-dum.mnt',
    subject: 'Whisper of the Earth',
    subjectPlaceholder: 'Earth’s secrets or a hidden path...',
    message: 'Secrets of stone and fire wait to be told.',
    messagePlaceholder: 'Dare you share knowledge older than ages?',
    button: 'Chisel Your Chronicle',
    hover: 'The deep speaks in runes older than time.',
    icon: <GiBattleAxe />,
    category: 'Dwarf',
  },

  // === Elf Scrolls (4 items) ===
  {
    title: 'Starlight on Silver Leaves',
    name: 'Name in the Tongue of Old',
    namePlaceholder: 'A Quenya or Sindarin name, perhaps...',
    email: 'galadriel@lothlorien.lore',
    emailPlaceholder: 'e.g. star-song@rivendell.elf',
    subject: 'Whisper from the Golden Wood',
    subjectPlaceholder: 'Prophecy, blessing, or a gentle counsel...',
    message: 'Let your words shine like Eärendil’s light...',
    messagePlaceholder: 'Pen your hopes or pleas beneath silver boughs...',
    button: 'Send from Lothlórien',
    hover: 'An elven scroll, elegant and timeless.',
    icon: <GiElfHelmet />,
    category: 'Elf',
  },
  {
    title: 'Light of Valinor',
    name: 'Name Carried by Starlight',
    namePlaceholder: 'Elrond, Arwen, or a new elven spirit...',
    email: 'elrond@imladris.elf',
    emailPlaceholder: 'e.g. halfelven@valar.org',
    subject: 'Council or Prophecy?',
    subjectPlaceholder: 'Counsel with the Wise or foresee events...',
    message: 'Speak, friend, and enter...',
    messagePlaceholder: 'State your quest in the refuge of Imladris...',
    button: 'Send to Rivendell',
    hover: 'A beacon among shadow.',
    icon: <GiElfHelmet />,
    category: 'Elf',
  },
  {
    title: 'Eternal Song',
    name: 'Whisperer of Wind',
    namePlaceholder: 'A melodic elven identity, perhaps...',
    email: 'silvan@forestlore.org',
    emailPlaceholder: 'e.g. thranduilscourt@greenwood.elf',
    subject: 'Melody of the Leaves',
    subjectPlaceholder: 'A lullaby, a lament, or a call to arms...',
    message: 'Your words sing with nature’s eternal chorus.',
    messagePlaceholder: 'Compose your verse in harmony with nature...',
    button: 'Echo through the Greenwood',
    hover: 'Every note carries the wisdom of ages.',
    icon: <GiElfHelmet />,
    category: 'Elf',
  },
  {
    title: 'Glimmer of Galadriel',
    name: 'Keeper of Illumination',
    namePlaceholder: 'Enlighten us with your chosen name...',
    email: 'nienna@elvenlight.net',
    emailPlaceholder: 'e.g. luminous@swanhaven.elf',
    subject: 'A Spark of Insight',
    subjectPlaceholder: 'Reveal a secret or ask for guidance...',
    message: 'May the light guide your pen as it does the stars.',
    messagePlaceholder: 'What wisdom does the mirror reveal?',
    button: 'Illuminate the Path',
    hover: 'An elven touch that transforms mortal musings into lore.',
    icon: <GiElfHelmet />,
    category: 'Elf',
  },

  // === Wizard Scrolls (4 items) ===
  {
    title: 'Grey Pilgrim',
    name: 'Wanderer’s Name',
    namePlaceholder: 'Mithrandir, Olorin, or something arcane...',
    email: 'mithrandir@istari.org',
    emailPlaceholder: 'e.g. wise-counsel@middle-earth.net',
    subject: 'Guidance You Seek',
    subjectPlaceholder: 'A riddle or a wizardly query...',
    message: 'Speak Wisely',
    messagePlaceholder: 'Words that might shift the balance of fate...',
    button: 'Summon Gandalf',
    hover: 'Wizard’s Words of Guidance',
    icon: <GiWizardStaff />,
    category: 'Wizard',
  },
  {
    title: 'Bearer of the Wand',
    name: 'Seeker of Arcane',
    namePlaceholder: 'Radagast, Saruman, or a new wizard name...',
    email: 'arcane@istari.org',
    emailPlaceholder: 'e.g. bird-friend@rosegarden.org',
    subject: 'Mysteries Await',
    subjectPlaceholder: 'A hidden lore or a dangerous puzzle...',
    message: 'Let magic and mystery be your guides.',
    messagePlaceholder: 'Shape the path of knowledge with your words...',
    button: 'Channel the Mystic',
    hover: 'Every incantation carries the weight of wisdom.',
    icon: <GiWizardStaff />,
    category: 'Wizard',
  },
  {
    title: 'Mystic Messenger',
    name: 'Seeker Beyond',
    namePlaceholder: 'Alatar, Pallando, or another enchanter?',
    email: 'mystic@valor.org',
    emailPlaceholder: 'e.g. starlit@eastwinds.ist',
    subject: 'Speak of the Unknown',
    subjectPlaceholder: 'Divination or lost spells to reclaim...',
    message: 'The world is woven with secret spells and whispers.',
    messagePlaceholder: 'Let your message shimmer with arcane power...',
    button: 'Dispatch the Enigma',
    hover: 'Messages not meant for mortal ears alone.',
    icon: <GiWizardStaff />,
    category: 'Wizard',
  },
  {
    title: 'Conjurer’s Covenant',
    name: 'Spellbound Wanderer',
    namePlaceholder: 'A name swirling with runes and magic...',
    email: 'conjurer@arcana.com',
    emailPlaceholder: 'e.g. starweave@unknownrealms.org',
    subject: 'Oath to the Elements',
    subjectPlaceholder: 'Which cosmic forces do you call upon?',
    message: 'May your words enchant as much as they inform.',
    messagePlaceholder: 'Swear your pledge or petition the ancient powers...',
    button: 'Seal the Covenant',
    hover: 'A pact forged in the fires of forgotten magic.',
    icon: <GiWizardStaff />,
    category: 'Wizard',
  },

  // === Man Scrolls (4 items) ===
  {
    title: 'Flame of the West',
    name: 'Bearer of the Flame?',
    namePlaceholder: 'Aragorn, Elessar, or your chosen lineage...',
    email: 'aragorn@gondor.king',
    emailPlaceholder: 'e.g. rightful-heir@gondor.gov',
    subject: 'Hope Reborn',
    subjectPlaceholder: 'A call for unity, or a message of coronation...',
    message: 'The sword has been reforged. The King has returned.',
    messagePlaceholder: 'Will your words rally the free peoples?',
    button: 'Send from the Throne',
    hover: 'The crownless again shall be king.',
    icon: <GiSwordsEmblem />,
    category: 'Man',
  },
  {
    title: 'Royal Decree',
    name: 'Call of the Crown',
    namePlaceholder: 'A regal moniker suiting your house...',
    email: 'royal@kingdom.gov',
    emailPlaceholder: 'e.g. steward@minas-tirith.org',
    subject: 'Command of the Realm',
    subjectPlaceholder: 'A royal edict or request for counsel...',
    message: 'Let your words echo in the halls of power.',
    messagePlaceholder: 'Proclaim your will as sovereign or steward...',
    button: 'Issue the Decree',
    hover: 'A proclamation fit for the true heir.',
    icon: <GiSwordsEmblem />,
    category: 'Man',
  },
  {
    title: 'Warrior’s Whisper',
    name: 'Echo of Valor',
    namePlaceholder: 'Boromir, Faramir, or a name of renown...',
    email: 'valor@armycourts.net',
    emailPlaceholder: 'e.g. soldier-of-gondor@battalion.me',
    subject: 'Battle Cry or Counsel?',
    subjectPlaceholder: 'Rally troops or find wise strategy...',
    message: 'Words of courage can rally armies or calm tempests.',
    messagePlaceholder: 'Declare your cause to friend or foe...',
    button: 'Resound the Call',
    hover: 'A murmur among warriors that speaks of destiny.',
    icon: <GiSwordsEmblem />,
    category: 'Man',
  },
  {
    title: 'Knight’s Oath',
    name: 'Shield of the Realm',
    namePlaceholder: 'A knightly name that upholds chivalry...',
    email: 'knight@valor.gov',
    emailPlaceholder: 'e.g. oathbound@whitecity.gov',
    subject: 'Vow of Allegiance',
    subjectPlaceholder: 'Swear fealty or a knightly pledge...',
    message: 'Stand true, for honor is the highest mantle.',
    messagePlaceholder: 'How will you uphold the code of chivalry?',
    button: 'Bind the Oath',
    hover: 'Loyalty is the heart of every true knight.',
    icon: <GiSwordsEmblem />,
    category: 'Man',
  },

  // === Villain Scrolls (4 items) ===
  {
    title: 'Voice of the Eye',
    name: 'Who Dares Address the Dark Lord?',
    namePlaceholder: 'Willing servant or cunning spy?',
    email: 'servant@baraddur.org',
    emailPlaceholder: 'e.g. acolyte@theblackgate.dark',
    subject: 'Intentions of Your Allegiance',
    subjectPlaceholder: 'Devotion or secret betrayal...',
    message: 'Speak now, before the Eye turns elsewhere.',
    messagePlaceholder: 'Kneel, or perhaps conspire in the shadows...',
    button: 'Submit to Sauron',
    hover: 'One Form to Rule Them All',
    icon: <GiDevilMask />,
    category: 'Villain',
  },
  {
    title: 'Shadow’s Command',
    name: 'Harbinger of Doom',
    namePlaceholder: 'Nazgûl, Witch-King, or a new dread title...',
    email: 'doom@shadowlands.org',
    emailPlaceholder: 'e.g. ringwraith@morghul.net',
    subject: 'Embrace the Abyss',
    subjectPlaceholder: 'Spread fear or deliver dire tidings...',
    message: 'Let your dark desires be known.',
    messagePlaceholder: 'Invoke ruin or pledge unholy alliance...',
    button: 'Step into the Shadows',
    hover: 'A call from where only the fearless tread.',
    icon: <GiDevilMask />,
    category: 'Villain',
  },
  {
    title: 'Lord of Lies',
    name: 'Manipulator of Fate',
    namePlaceholder: 'A cunning alias to shroud your aims...',
    email: 'lies@darkrealm.net',
    emailPlaceholder: 'e.g. black-tongue@serpentthrone.dark',
    subject: 'Whispered Deceits',
    subjectPlaceholder: 'Deception or a twisting of truth...',
    message: 'Not all truths are meant to be spoken.',
    messagePlaceholder: 'Plot your next move in the shadows...',
    button: 'Bind with Deception',
    hover: 'The path of treachery is paved with careful whispers.',
    icon: <GiDevilMask />,
    category: 'Villain',
  },
  {
    title: 'Master of Malice',
    name: 'Dark Overlord',
    namePlaceholder: 'A name dripping with dread...',
    email: 'overlord@evilinc.com',
    emailPlaceholder: 'e.g. dominion@night-fortress.dark',
    subject: 'The Final Bargain',
    subjectPlaceholder: 'Sacrifice or a cursed deal to be struck...',
    message: 'Surrender to the power of the night.',
    messagePlaceholder: 'Swear fealty to all-consuming darkness...',
    button: 'Seal Your Fate',
    hover: 'Darkness reigns when light falters.',
    icon: <GiDevilMask />,
    category: 'Villain',
  },
];

export default contactThemes;
