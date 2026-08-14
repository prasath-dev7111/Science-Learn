export const subjects = [
  {
    id: "physics",
    name: "Physics",
    emoji: "⚡",
    color: "#63b3ed",
    gradient: "linear-gradient(135deg, #63b3ed, #4299e1)",
    description: "Explore the laws governing motion, energy, forces, and the universe",
    topics: ["Motion", "Force", "Energy", "Work", "Gravity", "Waves", "Electricity"]
  },
  {
    id: "chemistry",
    name: "Chemistry",
    emoji: "🧪",
    color: "#f6ad55",
    gradient: "linear-gradient(135deg, #f6ad55, #ed8936)",
    description: "Dive into atoms, molecules, reactions, and the building blocks of matter",
    topics: ["Atoms", "Molecules", "Periodic Table", "Chemical Reactions", "Acids and Bases", "Organic Chemistry"]
  },
  {
    id: "biology",
    name: "Biology",
    emoji: "🧬",
    color: "#68d391",
    gradient: "linear-gradient(135deg, #68d391, #48bb78)",
    description: "Uncover the mysteries of life, cells, genetics, and living organisms",
    topics: ["Cells", "Human Body", "Plants", "Genetics", "Evolution", "Digestive System"]
  }
];

export const topicContent = {
  physics: {
    motion: {
      title: "Motion",
      emoji: "🏃",
      difficulty: "Beginner",
      readTime: "5 min",
      description: "Motion is the change in position of an object with respect to time. When an object moves from one place to another, it is said to be in motion. Motion can be slow or fast depending on how quickly the position changes.",
      keyPoints: [
        "Motion is the change in position with respect to time",
        "Speed = Distance / Time (unit: m/s)",
        "Velocity is speed with direction (vector quantity)",
        "Acceleration = Change in velocity / Time",
        "Uniform motion means constant speed in a straight line",
        "Newton's first law: an object in motion stays in motion"
      ],
      formula: ["Speed = Distance / Time", "Velocity = Displacement / Time", "Acceleration = (v-u) / t"],
      video: "https://www.youtube.com/embed/wUgYa5YLBbM?si=cQp8rc-CFvJ8PiHZ",
      flashcards: [
        { front: "What is motion?", back: "Change in position of an object with respect to time" },
        { front: "What is the SI unit of speed?", back: "Meters per second (m/s)" },
        { front: "What is the difference between speed and velocity?", back: "Speed is scalar (magnitude only), velocity is vector (magnitude + direction)" },
        { front: "What is uniform motion?", back: "Motion with constant speed in a straight line" },
        { front: "What is acceleration?", back: "Rate of change of velocity: a = (v-u)/t" }
      ]
    },
    force: {
      title: "Force",
      emoji: "💪",
      difficulty: "Beginner",
      readTime: "6 min",
      description: "Force is a push or a pull acting on an object that can change its position, shape, or direction of motion. When you push a door or pull a rope, you are applying force.",
      keyPoints: [
        "Force = Mass × Acceleration (Newton's 2nd Law)",
        "Forces can cause objects to start, stop, or change direction",
        "Balanced forces result in no change in motion",
        "Unbalanced forces cause acceleration",
        "Contact forces: friction, tension, normal force",
        "Non-contact forces: gravity, magnetic, electric"
      ],
      formula: ["F = ma", "Weight = mg", "Friction = μN"],
      video: "https://www.youtube.com/embed/IJWEtCRWGvI?si=EUg2zSBOU351RPnP",
      flashcards: [
        { front: "What is force?", back: "A push or pull that can change an object's motion, shape, or direction" },
        { front: "Newton's 2nd Law formula", back: "F = ma (Force = mass × acceleration)" },
        { front: "What is friction?", back: "A force that opposes relative motion between two surfaces in contact" },
        { front: "What is balanced force?", back: "When forces cancel each other out and there is no net force" },
        { front: "What is the SI unit of force?", back: "Newton (N)" }
      ]
    },
    energy: {
      title: "Energy",
      emoji: "⚡",
      difficulty: "Intermediate",
      readTime: "7 min",
      description: "Energy is the ability to do work. It exists in many forms including kinetic, potential, thermal, and electrical energy. Energy can be converted from one form to another but cannot be created or destroyed.",
      keyPoints: [
        "Energy cannot be created or destroyed (conservation of energy)",
        "Kinetic Energy = ½mv² (energy of motion)",
        "Potential Energy = mgh (stored energy due to position)",
        "Energy can be converted between different forms",
        "SI unit of energy is Joule (J)",
        "Power is the rate of energy transfer (P = E/t)"
      ],
      formula: ["KE = ½mv²", "PE = mgh", "Power = Work / Time"],
      video: "https://www.youtube.com/embed/u36H4Uo3rPM?si=PM7tBrs7jRgL99Sa",
      flashcards: [
        { front: "What is kinetic energy?", back: "Energy of motion: KE = ½mv²" },
        { front: "What is potential energy?", back: "Stored energy due to position: PE = mgh" },
        { front: "State the law of conservation of energy", back: "Energy cannot be created or destroyed, only converted from one form to another" },
        { front: "What is the SI unit of energy?", back: "Joule (J)" },
        { front: "What is power?", back: "Rate of energy transfer: P = E/t, measured in Watts (W)" }
      ]
    },
    work: {
      title: "Work",
      emoji: "🔧",
      difficulty: "Intermediate",
      readTime: "5 min",
      description: "Work is done when a force causes a displacement in the direction of the force. Work = Force × Distance × cos(θ), where θ is the angle between force and displacement.",
      keyPoints: [
        "Work = Force × Distance × cos(θ)",
        "Work is done only when displacement occurs",
        "If force and displacement are perpendicular, no work is done",
        "Work is a scalar quantity",
        "SI unit of work is Joule (J)",
        "1 Joule = 1 Newton × 1 meter"
      ],
      formula: ["W = F × d × cos(θ)", "W = F × d (when θ=0°)"],
      video: "https://www.youtube.com/embed/8iRDb7hU2Fw?si=mBmo926YCfeh3LCH",
      flashcards: [
        { front: "Formula for work", back: "W = F × d × cos(θ)" },
        { front: "When is work done?", back: "When a force causes displacement in the direction of the force" },
        { front: "If you push a wall and it doesn't move, how much work is done?", back: "Zero work, because there is no displacement" },
        { front: "What is the SI unit of work?", back: "Joule (J)" }
      ]
    },
    gravity: {
      title: "Gravity",
      emoji: "🌍",
      difficulty: "Beginner",
      readTime: "6 min",
      description: "Gravity is the force of attraction between all masses. Earth's gravity pulls objects toward its center with an acceleration of approximately 9.8 m/s². It keeps planets in orbit and governs the motion of celestial bodies.",
      keyPoints: [
        "Gravity is a universal force of attraction between all masses",
        "g on Earth ≈ 9.8 m/s² (acceleration due to gravity)",
        "Newton's law of gravitation: F = Gm₁m₂/r²",
        "Weight = mass × g",
        "Gravity decreases with distance (inverse square law)",
        "All objects fall at the same rate in vacuum (ignoring air resistance)"
      ],
      formula: ["F = Gm₁m₂/r²", "W = mg", "g = 9.8 m/s²"],
      video: "https://www.youtube.com/embed/Kw51KiZhm0I?si=NDJU9l_WeIpTAq4C",
      flashcards: [
        { front: "What is g on Earth's surface?", back: "9.8 m/s² (acceleration due to gravity)" },
        { front: "Newton's Universal Law of Gravitation", back: "F = Gm₁m₂/r² — every mass attracts every other mass" },
        { front: "What is weight?", back: "Force of gravity on an object: W = mg" },
        { front: "Who discovered the law of universal gravitation?", back: "Sir Isaac Newton (1687)" }
      ]
    },
    waves: {
      title: "Waves",
      emoji: "〰️",
      difficulty: "Intermediate",
      readTime: "8 min",
      description: "Waves are disturbances that transfer energy from one place to another without permanent displacement of the medium's particles. They can be transverse or longitudinal.",
      keyPoints: [
        "Waves transfer energy without transferring matter",
        "Transverse waves: particles vibrate perpendicular to wave direction",
        "Longitudinal waves: particles vibrate parallel to wave direction",
        "Wave speed = frequency × wavelength (v = fλ)",
        "Amplitude determines the energy of a wave",
        "Sound is a longitudinal wave; light is a transverse wave"
      ],
      formula: ["v = fλ", "T = 1/f", "Energy ∝ A²"],
      video: "https://www.youtube.com/embed/KWzyQKcJBYg?si=p-JZVRZDwk7npAmU",
      flashcards: [
        { front: "Wave speed formula", back: "v = fλ (speed = frequency × wavelength)" },
        { front: "What is the difference between transverse and longitudinal waves?", back: "Transverse: vibration perpendicular to direction; Longitudinal: vibration parallel to direction" },
        { front: "What is amplitude?", back: "Maximum displacement from the equilibrium position" },
        { front: "What is frequency?", back: "Number of complete waves per second, measured in Hertz (Hz)" }
      ]
    },
    electricity: {
      title: "Electricity",
      emoji: "🔌",
      difficulty: "Intermediate",
      readTime: "8 min",
      description: "Electricity is the flow of electric charge through a conductor. It powers our modern world. Key concepts include current, voltage, resistance, and their relationships through Ohm's Law.",
      keyPoints: [
        "Electric current is the flow of charge: I = Q/t",
        "Ohm's Law: V = IR (Voltage = Current × Resistance)",
        "Series circuits: same current, voltages add up",
        "Parallel circuits: same voltage, currents add up",
        "Power = Voltage × Current (P = VI)",
        "Conductors allow electricity to flow; insulators resist it"
      ],
      formula: ["V = IR", "P = VI", "I = Q/t"],
      video: "https://www.youtube.com/embed/ru032Mfsfig?si=0U6__11TUJKUis94",
      flashcards: [
        { front: "Ohm's Law", back: "V = IR (Voltage = Current × Resistance)" },
        { front: "What is electric current?", back: "Flow of electric charge: I = Q/t, measured in Amperes (A)" },
        { front: "Power formula in circuits", back: "P = VI = I²R = V²/R, measured in Watts (W)" },
        { front: "Difference between series and parallel circuits", back: "Series: same current, voltages add; Parallel: same voltage, currents add" }
      ]
    }
  },
  chemistry: {
    atoms: {
      title: "Atoms",
      emoji: "⚛️",
      difficulty: "Beginner",
      readTime: "6 min",
      description: "Atoms are the smallest units of matter that retain the chemical properties of an element. They consist of a nucleus containing protons and neutrons, surrounded by electrons.",
      keyPoints: [
        "Atoms consist of protons (+), neutrons (neutral), and electrons (-)",
        "Protons and neutrons are in the nucleus; electrons orbit around it",
        "Atomic number = number of protons (determines the element)",
        "Mass number = protons + neutrons",
        "Isotopes are atoms of the same element with different neutron counts",
        "Electrons occupy energy levels (shells) around the nucleus"
      ],
      formula: ["Atomic number = Protons", "Mass number = Protons + Neutrons", "Neutrons = Mass number - Atomic number"],
      video: "https://www.youtube.com/embed/oSCX78-8-q0",
      flashcards: [
        { front: "What is an atom?", back: "The smallest unit of an element that retains its chemical properties" },
        { front: "What particles are in the nucleus?", back: "Protons (positive charge) and neutrons (no charge)" },
        { front: "What is atomic number?", back: "The number of protons in an atom's nucleus" },
        { front: "What are isotopes?", back: "Atoms of the same element with different numbers of neutrons" },
        { front: "Who proposed the nuclear model of the atom?", back: "Ernest Rutherford (1911)" }
      ]
    },
    molecules: {
      title: "Molecules",
      emoji: "🔗",
      difficulty: "Beginner",
      readTime: "5 min",
      description: "Molecules are groups of two or more atoms held together by chemical bonds. They are the smallest particles of a compound that retain its chemical properties.",
      keyPoints: [
        "Molecules are formed when atoms share electrons (covalent bonds)",
        "Diatomic molecules: H₂, O₂, N₂, Cl₂, F₂, Br₂, I₂",
        "Molecular formula shows the exact number of atoms",
        "Structural formula shows how atoms are connected",
        "Polar molecules have uneven charge distribution",
        "Intermolecular forces determine physical properties"
      ],
      formula: ["H₂O (water)", "CO₂ (carbon dioxide)", "NaCl (table salt)"],
      video: "https://www.youtube.com/embed/C0Qaf-UJ2XQ?si=noeQ01Zc4ETX9D0g",
      flashcards: [
        { front: "What is a molecule?", back: "Two or more atoms held together by chemical bonds" },
        { front: "What type of bond holds molecules together?", back: "Covalent bond (sharing of electrons)" },
        { front: "Give 3 examples of diatomic molecules", back: "H₂ (hydrogen), O₂ (oxygen), N₂ (nitrogen)" },
        { front: "What is the molecular formula of water?", back: "H₂O (2 hydrogen + 1 oxygen)" }
      ]
    },
    periodictable: {
      title: "Periodic Table",
      emoji: "📊",
      difficulty: "Intermediate",
      readTime: "8 min",
      description: "The periodic table organizes all known elements by increasing atomic number. Elements in the same group share similar chemical properties. It was created by Dmitri Mendeleev in 1869.",
      keyPoints: [
        "118 elements are currently known",
        "Rows are called periods; columns are called groups",
        "Elements in same group have similar properties",
        "Metals are on the left; non-metals on the right",
        "Atomic radius decreases across a period (left to right)",
        "Atomic radius increases down a group"
      ],
      formula: ["Group = number of valence electrons", "Period = number of electron shells"],
      video: "https://www.youtube.com/embed/wXRHz5ZEIK0?si=bKnHJqiYefILbPQM",
      flashcards: [
        { front: "Who created the periodic table?", back: "Dmitri Mendeleev (1869)" },
        { front: "How many elements are in the periodic table?", back: "118 known elements" },
        { front: "What are periods in the periodic table?", back: "Horizontal rows, each representing a new energy level" },
        { front: "What are groups in the periodic table?", back: "Vertical columns with elements sharing similar properties" },
        { front: "What is the lightest element?", back: "Hydrogen (H), atomic number 1" }
      ]
    },
    chemicalreactions: {
      title: "Chemical Reactions",
      emoji: "💥",
      difficulty: "Intermediate",
      readTime: "7 min",
      description: "Chemical reactions involve the rearrangement of atoms to form new substances. Reactants are transformed into products, often with changes in temperature, color, or gas production.",
      keyPoints: [
        "Reactants → Products (atoms rearrange, not created/destroyed)",
        "Law of conservation of mass: mass is conserved",
        "Types: synthesis, decomposition, displacement, redox",
        "Catalysts speed up reactions without being consumed",
        "Exothermic reactions release heat; endothermic absorb heat",
        "Activation energy is needed to start a reaction"
      ],
      formula: ["Reactants → Products", "2H₂ + O₂ → 2H₂O"],
      video: "https://www.youtube.com/embed/NRCn8z8gb1w?si=qRGqm4En6Cr1NcfG",
      flashcards: [
        { front: "What is a chemical reaction?", back: "A process where reactants transform into new products with atoms rearranging" },
        { front: "What is the law of conservation of mass?", back: "Mass of reactants = mass of products; matter is neither created nor destroyed" },
        { front: "What is a catalyst?", back: "A substance that speeds up a reaction without being consumed" },
        { front: "Difference between exothermic and endothermic", back: "Exothermic releases heat; endothermic absorbs heat" }
      ]
    },
    acidsandbases: {
      title: "Acids and Bases",
      emoji: "🧫",
      difficulty: "Beginner",
      readTime: "6 min",
      description: "Acids release H⁺ ions in water (pH < 7) and taste sour. Bases release OH⁻ ions in water (pH > 7) and feel slippery. The pH scale measures acidity from 0 to 14.",
      keyPoints: [
        "pH scale: 0-6 = acidic, 7 = neutral, 8-14 = basic/alkaline",
        "Acids: HCl, H₂SO₄, citric acid (lemon juice)",
        "Bases: NaOH, KOH, ammonia, baking soda",
        "Neutralization: acid + base → salt + water",
        "Indicators (litmus) show if a substance is acid or base",
        "Strong acids/bases fully dissociate; weak ones partially"
      ],
      formula: ["Acid + Base → Salt + Water", "pH = -log[H⁺]"],
      video: "https://www.youtube.com/embed/V5Mq_cL9Bck?si=824tKglmmNNXJnJR",
      flashcards: [
        { front: "What pH value is neutral?", back: "pH 7 (pure water at 25°C)" },
        { front: "What do acids do to blue litmus?", back: "Turn it red" },
        { front: "What do bases do to red litmus?", back: "Turn it blue" },
        { front: "What is neutralization?", back: "Acid + Base → Salt + Water" },
        { front: "Give an example of a strong acid", back: "Hydrochloric acid (HCl), Sulfuric acid (H₂SO₄)" }
      ]
    },
    organicchemistry: {
      title: "Organic Chemistry",
      emoji: "🌿",
      difficulty: "Advanced",
      readTime: "9 min",
      description: "Organic chemistry studies carbon-containing compounds. Carbon's unique ability to form 4 bonds allows it to create millions of complex structures — the foundation of life itself.",
      keyPoints: [
        "Organic compounds contain carbon (with H, O, N, etc.)",
        "Hydrocarbons: alkanes (C-C), alkenes (C=C), alkynes (C≡C)",
        "Functional groups determine chemical properties",
        "Isomers have same formula but different structures",
        "Polymers are large chains of repeating monomer units",
        "Organic chemistry is basis of pharmaceuticals, plastics, fuels"
      ],
      formula: ["Alkanes: CₙH₂ₙ₊₂", "Alkenes: CₙH₂ₙ", "Alkynes: CₙH₂ₙ₋₂"],
      video: "https://www.youtube.com/embed/PmvLB5dIEp8?si=qfFWJGMCb8FCGD0-",
      flashcards: [
        { front: "What is organic chemistry?", back: "The study of carbon-containing compounds and their reactions" },
        { front: "What is a hydrocarbon?", back: "A compound containing only carbon and hydrogen" },
        { front: "Difference between alkanes, alkenes, alkynes", back: "Alkanes: single bonds; Alkenes: one double bond; Alkynes: one triple bond" },
        { front: "What are isomers?", back: "Compounds with the same molecular formula but different structural arrangements" }
      ]
    }
  },
  biology: {
    cells: {
      title: "Cells",
      emoji: "🔬",
      difficulty: "Beginner",
      readTime: "7 min",
      description: "Cells are the basic structural and functional units of all living organisms. They carry out all life processes including metabolism, reproduction, and response to the environment.",
      keyPoints: [
        "All living things are made of cells (cell theory)",
        "Prokaryotic cells (bacteria) have no membrane-bound nucleus",
        "Eukaryotic cells have a nucleus and membrane-bound organelles",
        "Cell membrane controls what enters and exits the cell",
        "Mitochondria: powerhouse of the cell (ATP production)",
        "Plant cells have cell walls, chloroplasts, and central vacuole"
      ],
      formula: ["ATP = Energy currency of cells", "Photosynthesis: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂"],
      video: "https://www.youtube.com/embed/URUJD5NEXC8",
      flashcards: [
        { front: "What is the cell theory?", back: "All living things are made of cells; cells come from existing cells" },
        { front: "What is the function of mitochondria?", back: "Produce ATP (energy) through cellular respiration — 'powerhouse of the cell'" },
        { front: "Difference between prokaryotic and eukaryotic cells", back: "Prokaryotic: no nucleus (bacteria); Eukaryotic: has nucleus (animals, plants, fungi)" },
        { front: "What organelle is unique to plant cells?", back: "Chloroplast (for photosynthesis) and cell wall" },
        { front: "What controls what enters and exits the cell?", back: "The cell membrane (semi-permeable)" }
      ]
    },
    humanbody: {
      title: "Human Body",
      emoji: "🫀",
      difficulty: "Intermediate",
      readTime: "8 min",
      description: "The human body is an extraordinary biological machine made of about 37 trillion cells organized into tissues, organs, and systems that work together to maintain life.",
      keyPoints: [
        "11 major organ systems work together",
        "Skeletal system: 206 bones provide structure and protection",
        "Nervous system: brain and nerves control everything",
        "Circulatory: heart pumps ~5L of blood per minute",
        "Respiratory: lungs exchange O₂ and CO₂",
        "Immune system defends against pathogens"
      ],
      formula: ["Heart rate: 60-100 bpm (resting)", "Lung capacity: ~6 liters"],
      video: "https://www.youtube.com/embed/Ae4MadKPJC0?si=KjhCwR-mFe-V1Hqk",
      flashcards: [
        { front: "How many bones are in the human body?", back: "206 bones in adults" },
        { front: "What is the largest organ?", back: "Skin (integumentary system)" },
        { front: "How many chambers does the heart have?", back: "4 chambers: left and right atria, left and right ventricles" },
        { front: "What is the function of red blood cells?", back: "Transport oxygen from lungs to body tissues (contain hemoglobin)" },
        { front: "What controls the body's functions?", back: "The nervous system (brain, spinal cord, and nerves)" }
      ]
    },
    plants: {
      title: "Plants",
      emoji: "🌱",
      difficulty: "Beginner",
      readTime: "6 min",
      description: "Plants are autotrophs that produce their own food through photosynthesis using sunlight, water, and CO₂. They are essential for life on Earth, producing oxygen and food.",
      keyPoints: [
        "Photosynthesis: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂",
        "Chlorophyll in chloroplasts captures sunlight",
        "Plants have roots, stems, leaves, and flowers",
        "Roots absorb water and minerals from soil",
        "Transpiration: water loss through leaves (stomata)",
        "Plants reproduce through seeds, spores, or vegetatively"
      ],
      formula: ["6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂"],
      video: "https://www.youtube.com/embed/A_DF246uVlU?si=COWOAmAGQt01X8_b",
      flashcards: [
        { front: "What is photosynthesis?", back: "Process by which plants make food using sunlight, CO₂, and water, releasing O₂" },
        { front: "Where does photosynthesis occur?", back: "In chloroplasts, specifically in the thylakoids" },
        { front: "What is transpiration?", back: "Loss of water vapor through stomata in leaves" },
        { front: "What pigment captures sunlight in plants?", back: "Chlorophyll (which also makes plants green)" }
      ]
    },
    genetics: {
      title: "Genetics",
      emoji: "🧬",
      difficulty: "Advanced",
      readTime: "10 min",
      description: "Genetics is the study of heredity and variation. Genes, made of DNA, carry instructions for traits and are passed from parents to offspring during reproduction.",
      keyPoints: [
        "DNA (deoxyribonucleic acid) carries genetic information",
        "DNA is organized into chromosomes (humans have 46)",
        "Genes are segments of DNA that code for proteins",
        "Mendel's laws: segregation and independent assortment",
        "Dominant alleles mask recessive alleles",
        "Mutations are changes in DNA sequence"
      ],
      formula: ["Genotype ratio (monohybrid cross): 1:2:1", "Phenotype ratio: 3:1"],
      video: "https://www.youtube.com/embed/Z6O_5Noh4WM?si=jtB6QwsAukVUfP6l",
      flashcards: [
        { front: "What is DNA?", back: "Deoxyribonucleic acid — molecule that carries genetic information in all living things" },
        { front: "How many chromosomes do humans have?", back: "46 chromosomes (23 pairs)" },
        { front: "Who is the father of genetics?", back: "Gregor Mendel (19th century monk who studied pea plants)" },
        { front: "What is a dominant allele?", back: "An allele that masks the effect of the recessive allele when present" },
        { front: "What is a mutation?", back: "A change in the DNA sequence; can be beneficial, harmful, or neutral" }
      ]
    },
    evolution: {
      title: "Evolution",
      emoji: "🦕",
      difficulty: "Intermediate",
      readTime: "8 min",
      description: "Evolution is the change in heritable characteristics of populations over successive generations. Natural selection, proposed by Darwin, is the primary mechanism driving evolution.",
      keyPoints: [
        "Natural selection: organisms with favorable traits reproduce more",
        "Charles Darwin proposed evolution by natural selection (1859)",
        "Variation exists within populations",
        "Favorable traits are inherited and become more common",
        "Speciation occurs when populations become reproductively isolated",
        "Evidence: fossil record, DNA similarities, anatomical homologies"
      ],
      formula: ["Survival of the fittest (natural selection)", "Hardy-Weinberg equilibrium"],
      video: "https://www.youtube.com/embed/P3GagfbA2vo?si=p9Bb1fZoODFG9uqn",
      flashcards: [
        { front: "Who proposed the theory of evolution by natural selection?", back: "Charles Darwin (in 'On the Origin of Species', 1859)" },
        { front: "What is natural selection?", back: "Process where organisms with favorable traits survive and reproduce more" },
        { front: "What is speciation?", back: "Formation of new species due to reproductive isolation and divergent evolution" },
        { front: "Name 3 evidences for evolution", back: "Fossil record, comparative anatomy (homologous structures), DNA/molecular evidence" }
      ]
    },
    digestivesystem: {
      title: "Digestive System",
      emoji: "🫃",
      difficulty: "Beginner",
      readTime: "7 min",
      description: "The digestive system breaks down food into nutrients that can be absorbed into the bloodstream. It spans from mouth to anus, involving mechanical and chemical digestion.",
      keyPoints: [
        "Digestion pathway: Mouth → Esophagus → Stomach → Small intestine → Large intestine",
        "Mechanical digestion: physical breakdown (chewing, churning)",
        "Chemical digestion: enzymes break down food molecules",
        "Stomach acid (HCl) kills bacteria and activates pepsin",
        "Small intestine is where most nutrient absorption occurs",
        "Large intestine absorbs water and forms feces"
      ],
      formula: ["Saliva: amylase breaks down starch", "Stomach: pepsin breaks down proteins"],
      video: "https://www.youtube.com/embed/X3TAROotFfM?si=IujoiGmjXf0bS4KT",
      flashcards: [
        { front: "What is the order of the digestive tract?", back: "Mouth → Esophagus → Stomach → Small intestine → Large intestine → Rectum → Anus" },
        { front: "Where does most nutrient absorption occur?", back: "Small intestine (via villi and microvilli)" },
        { front: "What enzyme is in saliva?", back: "Salivary amylase (breaks down starch into sugars)" },
        { front: "What is the role of the large intestine?", back: "Absorb water and electrolytes, form and store feces" }
      ]
    }
  }
};

export const quizData = {
  physics: {
    motion: [
      { question: "What is motion?", options: ["Change in position over time", "Amount of matter", "Force applied", "Energy stored"], answer: "Change in position over time", explanation: "Motion is defined as the change in position of an object with respect to time." },
      { question: "SI unit of speed?", options: ["m/s", "kg", "Newton", "Joule"], answer: "m/s", explanation: "Speed is measured in meters per second (m/s) in the SI system." },
      { question: "What is velocity?", options: ["Speed with direction", "Distance per time", "Mass times speed", "Force divided by mass"], answer: "Speed with direction", explanation: "Velocity is a vector quantity — it includes both speed (magnitude) and direction." },
      { question: "Acceleration = ?", options: ["Change in velocity / time", "Force × mass", "Distance / time", "Speed × direction"], answer: "Change in velocity / time", explanation: "Acceleration = (final velocity - initial velocity) / time taken" },
      { question: "What type of quantity is speed?", options: ["Scalar", "Vector", "Tensor", "Complex"], answer: "Scalar", explanation: "Speed is a scalar — it has magnitude only, no direction. Velocity is a vector." }
    ],
    force: [
      { question: "Newton's 2nd Law?", options: ["F = ma", "F = mv", "F = m/a", "F = a/m"], answer: "F = ma", explanation: "Force = mass × acceleration. A larger mass requires more force to accelerate." },
      { question: "What is friction?", options: ["Force opposing motion", "Force causing motion", "Stored energy", "Magnetic attraction"], answer: "Force opposing motion", explanation: "Friction is a contact force that opposes relative motion between surfaces." },
      { question: "SI unit of force?", options: ["Newton (N)", "Joule (J)", "Watt (W)", "Pascal (Pa)"], answer: "Newton (N)", explanation: "Force is measured in Newtons, named after Sir Isaac Newton." },
      { question: "What happens with balanced forces?", options: ["No change in motion", "Acceleration increases", "Object stops immediately", "Velocity doubles"], answer: "No change in motion", explanation: "Balanced (equal and opposite) forces result in zero net force — no change in motion." },
      { question: "Gravity is what type of force?", options: ["Non-contact force", "Contact force", "Friction force", "Tension force"], answer: "Non-contact force", explanation: "Gravity acts at a distance without physical contact, making it a non-contact force." }
    ],
    energy: [
      { question: "KE formula?", options: ["½mv²", "mgh", "mv", "½mgh"], answer: "½mv²", explanation: "Kinetic Energy = ½ × mass × velocity². Doubling speed quadruples kinetic energy." },
      { question: "SI unit of energy?", options: ["Joule (J)", "Watt (W)", "Newton (N)", "Pascal (Pa)"], answer: "Joule (J)", explanation: "Energy is measured in Joules (J). 1 J = 1 N·m" },
      { question: "PE = ?", options: ["mgh", "½mv²", "mv", "Fxd"], answer: "mgh", explanation: "Potential Energy = mass × gravity × height" },
      { question: "Energy conservation law states:", options: ["Energy cannot be created or destroyed", "Energy always decreases", "Energy multiplies in reactions", "Energy is mass"], answer: "Energy cannot be created or destroyed", explanation: "The law of conservation of energy: total energy in a closed system remains constant." }
    ],
    work: [
      { question: "Work formula?", options: ["F × d × cos θ", "F × d × sin θ", "F / d", "F + d"], answer: "F × d × cos θ", explanation: "Work = Force × displacement × cosine of angle between them." },
      { question: "If displacement is zero, work done is?", options: ["Zero", "Maximum", "Negative", "Infinite"], answer: "Zero", explanation: "Without displacement, no work is done regardless of how much force is applied." },
      { question: "Unit of work?", options: ["Joule", "Watt", "Newton", "Pascal"], answer: "Joule", explanation: "1 Joule = force of 1 Newton acting over 1 meter of displacement." }
    ],
    gravity: [
      { question: "Value of g on Earth?", options: ["9.8 m/s²", "9.8 m/s", "10 kg", "6.67 N"], answer: "9.8 m/s²", explanation: "Acceleration due to gravity on Earth's surface is approximately 9.8 m/s²." },
      { question: "Weight = ?", options: ["mg", "mv", "ma", "m/g"], answer: "mg", explanation: "Weight = mass × gravitational acceleration (W = mg)" },
      { question: "Who discovered universal gravitation?", options: ["Newton", "Einstein", "Galileo", "Faraday"], answer: "Newton", explanation: "Isaac Newton formulated the law of universal gravitation in 1687." }
    ],
    waves: [
      { question: "Wave speed = ?", options: ["f × λ", "f / λ", "f + λ", "λ / f"], answer: "f × λ", explanation: "Wave speed = frequency × wavelength (v = fλ)" },
      { question: "Sound is a __ wave", options: ["Longitudinal", "Transverse", "Electromagnetic", "Standing"], answer: "Longitudinal", explanation: "Sound waves are longitudinal — particles vibrate parallel to wave direction." },
      { question: "Light is a __ wave", options: ["Transverse", "Longitudinal", "Mechanical", "Pressure"], answer: "Transverse", explanation: "Light is a transverse electromagnetic wave — vibrations are perpendicular to direction." },
      { question: "Frequency unit?", options: ["Hertz (Hz)", "Newton (N)", "Joule (J)", "Meter (m)"], answer: "Hertz (Hz)", explanation: "Frequency is measured in Hertz — cycles per second." }
    ],
    electricity: [
      { question: "Ohm's Law?", options: ["V = IR", "V = I/R", "V = I+R", "I = VR"], answer: "V = IR", explanation: "Ohm's Law: Voltage = Current × Resistance" },
      { question: "Unit of resistance?", options: ["Ohm (Ω)", "Volt (V)", "Ampere (A)", "Watt (W)"], answer: "Ohm (Ω)", explanation: "Resistance is measured in Ohms (Ω)" },
      { question: "Power formula?", options: ["P = VI", "P = V/I", "P = I/V", "P = V+I"], answer: "P = VI", explanation: "Electrical power P = Voltage × Current" }
    ]
  },
  chemistry: {
    atoms: [
      { question: "Smallest unit of an element?", options: ["Atom", "Molecule", "Cell", "Electron"], answer: "Atom", explanation: "An atom is the smallest unit of a chemical element that retains its properties." },
      { question: "Atomic number equals?", options: ["Number of protons", "Number of neutrons", "Mass number", "Number of electrons + neutrons"], answer: "Number of protons", explanation: "Atomic number = number of protons in the nucleus; it identifies the element." },
      { question: "Where are electrons located?", options: ["Orbiting the nucleus", "In the nucleus", "Between protons", "In neutrons"], answer: "Orbiting the nucleus", explanation: "Electrons occupy energy levels (shells) orbiting around the nucleus." },
      { question: "Isotopes have different numbers of?", options: ["Neutrons", "Protons", "Electrons", "Quarks"], answer: "Neutrons", explanation: "Isotopes are atoms of the same element with the same protons but different neutrons." },
      { question: "Mass number = ?", options: ["Protons + Neutrons", "Protons + Electrons", "Neutrons only", "Electrons only"], answer: "Protons + Neutrons", explanation: "Mass number is the total count of protons and neutrons in the nucleus." }
    ],
    molecules: [
      { question: "Water molecule formula?", options: ["H₂O", "H₂O₂", "HO", "H₃O"], answer: "H₂O", explanation: "Water is H₂O: two hydrogen atoms bonded to one oxygen atom." },
      { question: "Molecules are held together by?", options: ["Covalent bonds", "Ionic bonds only", "Nuclear forces", "Gravity"], answer: "Covalent bonds", explanation: "In molecules, atoms share electrons in covalent bonds." },
      { question: "CO₂ is the formula for?", options: ["Carbon dioxide", "Carbon monoxide", "Carbonic acid", "Carbon"], answer: "Carbon dioxide", explanation: "CO₂ = Carbon dioxide: 1 carbon and 2 oxygen atoms bonded covalently." }
    ],
    periodictable: [
      { question: "Who created the periodic table?", options: ["Mendeleev", "Newton", "Bohr", "Curie"], answer: "Mendeleev", explanation: "Dmitri Mendeleev created the first widely recognized periodic table in 1869." },
      { question: "How many elements are there?", options: ["118", "92", "100", "108"], answer: "118", explanation: "There are currently 118 confirmed chemical elements in the periodic table." },
      { question: "Vertical columns in periodic table are called?", options: ["Groups", "Periods", "Rows", "Series"], answer: "Groups", explanation: "Vertical columns are called groups; elements in a group share similar properties." },
      { question: "Element with atomic number 1?", options: ["Hydrogen", "Helium", "Lithium", "Carbon"], answer: "Hydrogen", explanation: "Hydrogen (H) has atomic number 1 — the lightest and most abundant element." }
    ],
    chemicalreactions: [
      { question: "Reactants → ?", options: ["Products", "Elements", "Atoms", "Ions"], answer: "Products", explanation: "In a chemical reaction, reactants are transformed into products." },
      { question: "A catalyst does what?", options: ["Speeds up reaction without being consumed", "Slows reaction", "Creates energy", "Destroys reactants"], answer: "Speeds up reaction without being consumed", explanation: "Catalysts lower activation energy and speed up reactions without being consumed." },
      { question: "Exothermic reaction?", options: ["Releases heat", "Absorbs heat", "No energy change", "Only light change"], answer: "Releases heat", explanation: "Exothermic reactions release energy (heat) to the surroundings — combustion is an example." }
    ],
    acidsandbases: [
      { question: "Acids taste?", options: ["Sour", "Sweet", "Bitter", "Salty"], answer: "Sour", explanation: "Acids taste sour — like vinegar (acetic acid) and citrus (citric acid)." },
      { question: "pH of neutral substance?", options: ["7", "0", "14", "10"], answer: "7", explanation: "A pH of 7 is neutral. Below 7 is acidic; above 7 is basic/alkaline." },
      { question: "Acids turn litmus paper?", options: ["Red", "Blue", "Green", "Yellow"], answer: "Red", explanation: "Acids turn blue litmus paper red; bases turn red litmus paper blue." },
      { question: "Neutralization reaction produces?", options: ["Salt + Water", "Acid + Base", "Gas + Solid", "Only water"], answer: "Salt + Water", explanation: "Acid + Base → Salt + Water (neutralization reaction)" }
    ],
    organicchemistry: [
      { question: "Organic chemistry studies?", options: ["Carbon compounds", "All metals", "Noble gases", "Ionic salts"], answer: "Carbon compounds", explanation: "Organic chemistry focuses on carbon-containing compounds (with H, O, N, S, P etc.)" },
      { question: "Alkanes general formula?", options: ["CₙH₂ₙ₊₂", "CₙH₂ₙ", "CₙH₂ₙ₋₂", "CₙHₙ"], answer: "CₙH₂ₙ₊₂", explanation: "Alkanes (saturated hydrocarbons) follow CₙH₂ₙ₊₂ formula. Methane = CH₄" }
    ]
  },
  biology: {
    cells: [
      { question: "Basic unit of life?", options: ["Cell", "Atom", "Organ", "Tissue"], answer: "Cell", explanation: "Cells are the basic structural and functional units of all living organisms." },
      { question: "Powerhouse of the cell?", options: ["Mitochondria", "Nucleus", "Ribosome", "Golgi body"], answer: "Mitochondria", explanation: "Mitochondria produce ATP (energy) through cellular respiration." },
      { question: "Prokaryotic cells have no?", options: ["Nucleus", "DNA", "Cell membrane", "Ribosomes"], answer: "Nucleus", explanation: "Prokaryotic cells (bacteria) lack a membrane-bound nucleus." },
      { question: "Chloroplasts are found in?", options: ["Plant cells only", "Animal cells only", "Both plant and animal", "Bacteria only"], answer: "Plant cells only", explanation: "Chloroplasts are organelles found only in plant cells; they perform photosynthesis." },
      { question: "Cell membrane is?", options: ["Semi-permeable", "Fully permeable", "Impermeable", "Made of glass"], answer: "Semi-permeable", explanation: "The cell membrane is semi-permeable — selectively allows substances to pass through." }
    ],
    humanbody: [
      { question: "How many bones in adult body?", options: ["206", "260", "300", "150"], answer: "206", explanation: "Adult humans have 206 bones. Babies are born with about 270, which fuse over time." },
      { question: "Largest organ of the body?", options: ["Skin", "Liver", "Lung", "Brain"], answer: "Skin", explanation: "Skin is the largest organ — it covers the entire body and has multiple functions." },
      { question: "Heart has how many chambers?", options: ["4", "2", "3", "6"], answer: "4", explanation: "The heart has 4 chambers: left and right atria, left and right ventricles." },
      { question: "Red blood cells carry?", options: ["Oxygen", "Carbon dioxide only", "Nutrients", "Water"], answer: "Oxygen", explanation: "Red blood cells contain hemoglobin which binds and transports oxygen to body tissues." }
    ],
    plants: [
      { question: "Photosynthesis equation product includes?", options: ["Glucose + Oxygen", "CO₂ + Water", "Nitrogen + Carbon", "Starch + CO₂"], answer: "Glucose + Oxygen", explanation: "Photosynthesis: CO₂ + H₂O + light → Glucose (C₆H₁₂O₆) + Oxygen (O₂)" },
      { question: "Chlorophyll is found in?", options: ["Chloroplasts", "Mitochondria", "Nucleus", "Cell wall"], answer: "Chloroplasts", explanation: "Chlorophyll, the green pigment that absorbs sunlight, is inside chloroplasts." },
      { question: "Transpiration is loss of?", options: ["Water vapor through leaves", "CO₂ from roots", "Oxygen from stems", "Sugar from flowers"], answer: "Water vapor through leaves", explanation: "Transpiration is the loss of water vapor through stomata (pores) in leaves." }
    ],
    genetics: [
      { question: "DNA stands for?", options: ["Deoxyribonucleic acid", "Dinucleic acid", "Double nucleic acid", "Direct nuclear acid"], answer: "Deoxyribonucleic acid", explanation: "DNA = Deoxyribonucleic acid — the molecule carrying genetic information in all living things." },
      { question: "Humans have how many chromosomes?", options: ["46", "23", "92", "48"], answer: "46", explanation: "Humans have 46 chromosomes arranged in 23 pairs (one set from each parent)." },
      { question: "Father of genetics?", options: ["Gregor Mendel", "Darwin", "Watson", "Crick"], answer: "Gregor Mendel", explanation: "Gregor Mendel (1822-1884) established the laws of heredity through pea plant experiments." },
      { question: "Dominant allele?", options: ["Masks recessive allele", "Is hidden by recessive", "Only in plants", "Only in humans"], answer: "Masks recessive allele", explanation: "Dominant alleles are expressed when present; they mask the effect of recessive alleles." }
    ],
    evolution: [
      { question: "Natural selection was proposed by?", options: ["Charles Darwin", "Gregor Mendel", "Louis Pasteur", "Lamarck"], answer: "Charles Darwin", explanation: "Charles Darwin proposed natural selection in 'On the Origin of Species' (1859)." },
      { question: "Evolution is change in?", options: ["Heritable traits over generations", "Individual organisms", "Only body size", "Only DNA"], answer: "Heritable traits over generations", explanation: "Evolution is the change in heritable characteristics of populations across successive generations." },
      { question: "Fossil record is evidence of?", options: ["Evolution", "Creationism", "Spontaneous generation", "Genetics"], answer: "Evolution", explanation: "Fossils show how organisms have changed and diversified over millions of years." }
    ],
    digestivesystem: [
      { question: "Digestion starts in?", options: ["Mouth", "Stomach", "Small intestine", "Esophagus"], answer: "Mouth", explanation: "Digestion begins in the mouth through chewing (mechanical) and saliva (chemical)." },
      { question: "Where does most absorption occur?", options: ["Small intestine", "Stomach", "Large intestine", "Esophagus"], answer: "Small intestine", explanation: "The small intestine has villi and microvilli that maximize nutrient absorption surface area." },
      { question: "Enzyme in saliva?", options: ["Amylase", "Pepsin", "Lipase", "Trypsin"], answer: "Amylase", explanation: "Salivary amylase in the mouth begins breaking down starch into simpler sugars." },
      { question: "Large intestine mainly absorbs?", options: ["Water", "Proteins", "Fats", "Glucose"], answer: "Water", explanation: "The large intestine absorbs water and electrolytes from remaining indigestible food." }
    ]
  }
};
