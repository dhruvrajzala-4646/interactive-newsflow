
export interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  category: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
  saved: boolean;
  trending: boolean;
  featured: boolean;
}

export const newsData: NewsArticle[] = [
  {
    id: 1,
    title: "Global Climate Summit Ends with Historic Agreement",
    summary: "World leaders reach unprecedented consensus on carbon reduction targets, pledging a 50% cut by 2030.",
    content: `<p>In a landmark decision that surprised many observers, the Global Climate Summit concluded yesterday with all 196 participating nations signing the most ambitious climate agreement to date. The accord, dubbed "The New Climate Charter," commits signatories to reduce carbon emissions by 50% before 2030 and achieve carbon neutrality by 2050.</p>
    
    <p>"This is truly a historic moment," said UN Secretary-General Antonio Guterres. "For the first time, we are seeing genuine consensus and commitment from both developed and developing nations."</p>
    
    <p>The agreement includes substantial financial commitments from wealthy nations, with a pledged $100 billion annual fund to help developing countries transition to renewable energy sources. Additionally, the agreement establishes an independent monitoring body that will track progress and ensure accountability.</p>
    
    <p>Climate activists have cautiously welcomed the agreement, though many emphasize that implementation will be the true test. "The targets are ambitious, which is what science demands," said Greta Thunberg. "But now we need to see action, not just promises."</p>
    
    <p>Markets reacted positively to the news, with renewable energy stocks surging and fossil fuel companies seeing significant drops in share prices. Analysts predict this agreement will accelerate the already rapid growth in green technology investment.</p>`,
    imageUrl: "https://source.unsplash.com/random/?climate",
    category: "Environment",
    author: "Sarah Johnson",
    date: "2023-11-15",
    likes: 1543,
    comments: 284,
    saved: false,
    trending: true,
    featured: true
  },
  {
    id: 2,
    title: "Revolutionary AI System Can Predict Protein Structures with 98% Accuracy",
    summary: "DeepMind's new AlphaFold 3 breakthrough promises to transform drug discovery and biological research.",
    content: `<p>DeepMind, the AI research lab owned by Google parent company Alphabet, has announced a breakthrough in protein structure prediction that scientists are calling "transformative" for biological research and drug development.</p>
    
    <p>The new system, AlphaFold 3, can predict the three-dimensional shape of proteins with an unprecedented 98% accuracy, a significant improvement over its predecessor which already revolutionized the field two years ago.</p>
    
    <p>"This is a quantum leap forward," said Dr. Emma Richardson, a computational biologist at Stanford University who wasn't involved in the research. "Protein folding has been a grand challenge in biology for decades. With this level of accuracy, we can now confidently model virtually any protein in the human body or in pathogens."</p>
    
    <p>Understanding protein structures is crucial for drug development and biological research, as a protein's shape determines its function. Traditionally, determining these structures required months or years of laboratory work.</p>
    
    <p>DeepMind has announced it will make AlphaFold 3 available to the scientific community, potentially accelerating research across multiple fields. Several pharmaceutical companies have already announced plans to incorporate the technology into their drug discovery pipelines.</p>`,
    imageUrl: "https://source.unsplash.com/random/?technology",
    category: "Technology",
    author: "Michael Chen",
    date: "2023-11-14",
    likes: 3287,
    comments: 413,
    saved: true,
    trending: true,
    featured: false
  },
  {
    id: 3,
    title: "Crypto Market Surges as US Approves First Bitcoin ETF",
    summary: "Bitcoin hits all-time high following SEC approval of spot Bitcoin ETFs, opening cryptocurrency to mainstream investors.",
    content: `<p>The cryptocurrency market experienced a historic surge today after the U.S. Securities and Exchange Commission (SEC) approved the first spot Bitcoin exchange-traded funds (ETFs), ending a decade-long wait and potentially opening cryptocurrency to millions of mainstream investors.</p>
    
    <p>Bitcoin immediately responded by climbing to an all-time high of $88,000, a 15% increase in just 24 hours. Other cryptocurrencies followed suit, with Ethereum up 12% and the total cryptocurrency market capitalization crossing $3 trillion for the first time.</p>
    
    <p>"This is the legitimization that the crypto industry has been waiting for," said Cathie Wood, CEO of Ark Invest, one of the firms that received approval for its Bitcoin ETF application. "It signals that cryptocurrency has matured as an asset class."</p>
    
    <p>The approved ETFs will begin trading next week on the NYSE and Nasdaq, allowing investors to gain exposure to Bitcoin without directly purchasing and storing the digital asset. Analysts predict this could bring a flood of institutional money into the cryptocurrency market.</p>
    
    <p>The decision represents a significant shift in the SEC's stance toward cryptocurrency under new leadership. Previously, the commission had rejected numerous Bitcoin ETF applications, citing concerns about market manipulation and investor protection.</p>`,
    imageUrl: "https://source.unsplash.com/random/?cryptocurrency",
    category: "Finance",
    author: "Jason Rodriguez",
    date: "2023-11-13",
    likes: 2186,
    comments: 597,
    saved: false,
    trending: true,
    featured: false
  },
  {
    id: 4,
    title: "NASA Announces 2026 Mission to Investigate Signs of Microbial Life on Europa",
    summary: "The Europa Clipper mission will explore Jupiter's moon, focusing on potential habitable conditions beneath its icy surface.",
    content: `<p>NASA has confirmed plans for an ambitious mission to Jupiter's moon Europa, scheduled for launch in 2026. The mission, named Europa Clipper, will investigate the icy moon's potential to harbor life within its subsurface ocean.</p>
    
    <p>"Europa is one of our best chances to find life elsewhere in our solar system," said Dr. Robert Pappalardo, the mission's project scientist. "We have strong evidence suggesting a vast ocean beneath its frozen surface, containing more water than all of Earth's oceans combined."</p>
    
    <p>The spacecraft will carry nine specialized instruments designed to investigate Europa's composition, the thickness of its ice shell, and the characteristics of its ocean. Of particular interest are the plumes of water vapor that previous observations have detected erupting from the moon's surface, which could provide direct samples of the subsurface ocean without having to drill through miles of ice.</p>
    
    <p>Recent analyses of these plumes have shown the presence of complex organic molecules, raising the tantalizing possibility that Europa might contain the building blocks for life.</p>
    
    <p>The $4.5 billion mission will involve the spacecraft performing approximately 45 close flybys of Europa, coming as close as 16 miles to the moon's surface, while orbiting Jupiter to avoid the gas giant's intense radiation fields which could damage the spacecraft's electronics.</p>`,
    imageUrl: "https://source.unsplash.com/random/?space",
    category: "Science",
    author: "Elena Martinez",
    date: "2023-11-12",
    likes: 4285,
    comments: 342,
    saved: true,
    trending: false,
    featured: true
  },
  {
    id: 5,
    title: "Major Breakthrough in Quantum Computing Achieves Quantum Supremacy for Practical Applications",
    summary: "IBM's new 1,000-qubit quantum computer solves complex problems impossible for traditional supercomputers.",
    content: `<p>IBM has announced a significant breakthrough in quantum computing, unveiling a 1,000-qubit quantum processor that has demonstrated quantum supremacy for commercially relevant problems for the first time.</p>
    
    <p>The new quantum computer, named "Condor," successfully simulated complex chemical reactions for pharmaceutical research that would have taken conventional supercomputers thousands of years to solve. The calculations were completed in just 3.5 hours.</p>
    
    <p>"This marks the transition of quantum computing from a theoretical curiosity to a practical tool," said Dr. Dario Gil, IBM's Senior Vice President and Director of Research. "We've crossed a threshold where quantum computers can now solve problems that have real commercial and scientific value."</p>
    
    <p>The breakthrough hinges on IBM's new quantum error correction system, which significantly reduces the noise and errors that have plagued quantum computers and limited their practical applications. This improvement in error correction allows the quantum computer to perform longer and more complex calculations with sufficient accuracy for practical use.</p>
    
    <p>Several major pharmaceutical companies have already partnered with IBM to use the new system for drug discovery applications, potentially revolutionizing the development of new medications by dramatically accelerating the process of identifying and testing new molecular compounds.</p>`,
    imageUrl: "https://source.unsplash.com/random/?quantum",
    category: "Technology",
    author: "David Kumar",
    date: "2023-11-10",
    likes: 1892,
    comments: 208,
    saved: false,
    trending: true,
    featured: false
  }
];

export const breakingNews = [
  "Breaking: Global stock markets rally as inflation fears ease",
  "Just in: Major technological breakthrough in fusion energy announced",
  "Alert: Tropical storm developing in the Atlantic, coastal warnings issued",
  "Update: International Space Station successfully completes critical repairs",
  "Developing story: Diplomatic breakthrough in Middle East peace negotiations"
];
