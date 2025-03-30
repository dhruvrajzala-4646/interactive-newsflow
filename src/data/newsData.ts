
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
  liked: boolean;
  trending: boolean;
  featured: boolean;
}

export const newsData: NewsArticle[] = [
  {
    id: 1,
    title: "OpenAI’s Ghibli-Style AI Art Sparks Creativity—And Controversy",
    summary: "OpenAI’s new AI image tool transforms photos into stunning Studio Ghibli-style art. But with copyright concerns and artists raising ethical questions, is this the future of creativity or a lawsuit waiting to happen?",
    content:  "OpenAI’s latest AI-powered image tool has revolutionized the way people create art, allowing users to transform any photo into breathtaking Studio Ghibli-style artwork. The tool, built into OpenAI’s DALL·E image generator, applies advanced machine learning techniques to produce visuals that resemble the signature hand-drawn, soft-color aesthetic of classic Ghibli films such as My Neighbor Totoro and Spirited Away. Social media has exploded with users sharing their AI-generated Ghibli-style artwork, with many calling it 'magical' and 'beyond imagination.' From anime lovers to professional designers, people are experimenting with this technology to see just how well AI can capture the feeling of traditional Japanese animation. However, this surge in AI-generated Ghibli-style images has triggered major ethical and legal concerns. Many artists argue that AI-generated art often relies on training data derived from human-made works, raising questions about whether AI is effectively 'stealing' artistic styles without consent. Critics argue that OpenAI's model, while impressive, still lacks the true creativity and soul of a human artist. Digital artist Yuki Tanaka expressed frustration, saying, 'This AI is generating work that closely resembles a style that took decades to develop. If it’s not directly copying, it’s certainly imitating in a way that threatens original artists.' The controversy doesn’t stop there. Some legal experts believe that OpenAI’s latest tool could lead to lawsuits from major animation studios, including Studio Ghibli itself, which has a reputation for being protective over its artistic legacy. While AI companies insist their models are trained on publicly available data and are not infringing copyright, legal battles around AI-generated content are still a grey area. There is currently no clear precedent on how courts will handle AI-generated art that mimics an established artistic style without direct permission. Meanwhile, OpenAI defends its tool by arguing that AI doesn’t 'copy' but rather learns patterns and artistic elements from vast amounts of data, generating entirely new compositions. Some believe this AI-driven technology could be a game-changer for businesses, content creators, and marketers. Companies are already experimenting with using AI-generated Ghibli-style artwork for branding, advertising, and digital storytelling. Video creators are using it to add a unique aesthetic to short films and animations, while some indie game developers have begun exploring AI-enhanced visuals for their projects. Despite the backlash, it is undeniable that AI-generated art is here to stay. The technology is rapidly improving, and as more users embrace AI tools for creative projects, debates around ethics, ownership, and legality will only intensify. Whether this marks the beginning of a new digital art revolution or a massive legal showdown, one thing is clear—AI’s ability to create visually stunning, Ghibli-inspired artwork has captivated the internet like never before.",
    imageUrl: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Foomgwb8pz1if0lun1wbt.jpg",
    category: "AI Tool",
    author: "Sarah Johnson",
    date: "2025-03-30",
    likes: 1543,
    comments: 284,
    saved: false,
    liked: false,
    trending: true,
    featured: true
  },
  {
    id: 2,
    title: "H&M Uses AI-Generated Models – Fashion’s Future or a Big Mistake?",
    summary: "H&M has started using AI-generated models to showcase clothing on its website, sparking both excitement and controversy. Supporters argue that AI models can improve diversity, save costs, and streamline production, but critics worry about job losses for real models and the potential for misleading advertising. Some also raise ethical concerns about AI-generated bodies setting unrealistic beauty standards. As AI continues to disrupt the fashion industry, the question remains: Is this the future of online retail, or is H&M making a critical mistake?",
    content: "H&M has taken a bold step into the future of fashion by introducing AI-generated models to display clothing on its website. Instead of using real models for every photoshoot, the company now employs artificial intelligence to create lifelike images of people wearing H&M apparel. This AI-driven approach allows for faster content production, cost savings, and the ability to generate diverse-looking models without the need for large-scale photoshoots. While some see this as a technological breakthrough, others believe it could have serious consequences for the fashion industry. Supporters argue that AI-generated models can increase representation by allowing brands to create a wider range of body types, skin tones, and facial features. Additionally, AI eliminates the need for expensive model hiring and studio photoshoots, making fashion campaigns more cost-effective. However, critics worry that replacing real models with AI-generated ones could lead to widespread job losses in the modeling industry. Many also express concerns that AI-generated images could set unrealistic beauty standards, just as photoshopped models have in the past. AI models can be manipulated to create 'perfect' features, which might negatively impact self-esteem and body image among consumers. Another major concern is transparency. If retailers like H&M do not clearly label AI-generated models, customers may feel misled about how clothing will actually look on real people. The lack of real-world lighting, body movement, and texture variations could result in buyers receiving products that don't match their expectations. Fashion experts predict that AI-generated models will soon become standard in e-commerce, but brands will need to find a balance between technology and authenticity. Some suggest that a hybrid approach—using both AI and real models—could be the solution. Whether H&M’s move is a glimpse into the future or a misstep remains to be seen, but one thing is certain: AI is rapidly reshaping the way fashion is marketed, and other brands will likely follow in its footsteps.",
    imageUrl: "https://www.businessoffashion.com/resizer/v2/G4SOKW6R5ZGD7OECXUXGBCEOHE.jpg?auth=b43d26ace108b3923ac93ba9ed9b59eb67834702705dc2209031cae8f22578ab",
    category: "AI in Business",
    author: "Michael Chen",
    date: "2025-03-30",
    likes: 3287,
    comments: 413,
    saved: true,
    liked: false,
    trending: true,
    featured: false
  },
  {
    id: 3,
    title: "AI Humanoid Robots Are Here – And They Want Your Job",
    summary: "A Chinese startup has unveiled AI-powered humanoid robots designed to work in luxury car factories, marking a major step in automation. These robots are equipped with advanced AI that allows them to learn and adapt like human workers, sparking concerns about job displacement. While businesses see potential cost savings and efficiency gains, critics warn of mass unemployment and ethical challenges. As humanoid robots become more capable, are we witnessing the future of manufacturing—or the beginning of a new labor crisis?",
    content: "A Chinese robotics startup has made headlines by developing highly advanced AI-powered humanoid robots for luxury car factories. Unlike traditional industrial robots, these humanoid machines are designed to perform tasks previously exclusive to human workers, such as assembling delicate components and even learning new skills through artificial intelligence. The company claims these robots can improve efficiency and reduce manufacturing costs, making them an attractive investment for major automakers. But not everyone is celebrating. Labor unions and workers' rights activists warn that the rise of humanoid robots could lead to massive job losses. The fear is that AI-powered automation will eventually replace human employees, leaving millions of factory workers unemployed. Some experts argue that while automation has historically created new types of jobs, humanoid robots are different because they can perform a wider range of tasks that were once thought to be uniquely human. Businesses, on the other hand, see a major opportunity. Automakers are under pressure to cut costs and increase production speed, and AI-powered robots offer a solution. These machines don’t need breaks, don’t demand wages, and can work 24/7 without fatigue. For industries facing labor shortages, humanoid robots could provide a much-needed workforce solution. However, ethical concerns remain. Some critics worry that widespread robot adoption could create a social divide, where only highly skilled tech workers remain employed while others struggle to find work. Additionally, questions about how these robots should be regulated and taxed are still unresolved. If companies replace human workers with AI, should they still pay the same labor taxes? As AI humanoid robots continue to advance, this debate will only intensify. Are we entering a new era of technological progress, or are we heading toward a labor crisis? The answer may determine the future of work itself.",
    imageUrl: "https://i.ytimg.com/vi/sgo-jF4j8g8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD8Ghn0UKMXY4dNjfqChVYo6yaVEg",
    category: "AI Robotics",
    author: "Jason Rodriguez",
    date: "2025-03-30",
    likes: 2186,
    comments: 597,
    saved: false,
    liked: false,
    trending: true,
    featured: false
  },
  {
    id: 4,
    title: "This AI Startup Just Raised $100M to Revolutionize Healthcare!",
    summary: "AI healthcare startup Akido Labs has secured a massive $100 million funding round to expand its AI-driven medical services. The company aims to provide on-demand healthcare for gig workers, including ride-share drivers, through its AI-powered virtual doctor. With investors betting big on AI in healthcare, could this be the future of accessible and affordable medical care?",
    content: "Akido Labs, an AI-powered healthcare startup, has just raised $100 million in funding, marking a major step forward in the AI-driven medical industry. The company’s mission is to provide affordable and instant healthcare access to gig workers, including Uber and Lyft drivers, who often lack traditional health insurance. By leveraging artificial intelligence, Akido Labs has developed a virtual doctor that can diagnose conditions, recommend treatments, and connect patients with real medical professionals if necessary. The funding round was led by prominent venture capital firms, highlighting strong investor confidence in AI’s role in the future of healthcare. Akido Labs' platform uses advanced machine learning to analyze symptoms and medical histories, offering patients personalized treatment options in real time. The goal is to create a system where gig workers and other underserved populations can receive quality medical care without long wait times or high costs. This AI-driven approach aims to solve one of healthcare’s biggest challenges: accessibility. Traditional healthcare systems are often slow, expensive, and difficult to navigate, especially for independent contractors and part-time workers. By introducing AI-based virtual doctors, Akido Labs hopes to fill this gap by providing 24/7 healthcare services at a fraction of the cost of conventional medical visits. However, the rise of AI in healthcare raises questions about accuracy, ethics, and the role of human doctors. While AI can provide faster diagnoses, some experts worry that it might not fully replace the expertise of human physicians. There are also concerns about data privacy, as AI-driven healthcare relies heavily on patient data for personalized recommendations. Despite these challenges, Akido Labs' success signals a growing trend in AI-driven medical solutions. With its latest funding, the company plans to expand its services, improve its AI models, and potentially revolutionize how millions of gig workers access healthcare. Is AI the future of medicine, or should we be cautious about trusting artificial intelligence with our health? One thing is certain: investors and industry leaders are watching closely as AI continues to reshape healthcare.",
    imageUrl: "https://images.wsj.net/im-84095909/social",
    category: "AI Startup",
    author: "Elena Martinez",
    date: "2023-11-12",
    likes: 4285,
    comments: 342,
    saved: true,
    liked: false,
    trending: false,
    featured: true
  },
  {
    id: 5,
    title: "AI-Generated Influencer Aitana López Sparks Debate in Fashion Industry",
    summary: "Aitana López, an AI-created virtual influencer from Barcelona, has gained significant attention as Spain's 'hottest supermodel.' Developed by Clueless AI, Aitana's hyper-realistic features and engaging personality have attracted 350,000 followers and brand partnerships worth £1,000 per post. While some praise the innovation, others raise concerns about the impact on human models and the authenticity of digital influencers.",
    content: "Aitana López, an AI-generated virtual influencer developed by Clueless AI in Barcelona, has rapidly become a prominent figure in the fashion and social media landscapes. With her strikingly realistic appearance and carefully crafted online persona, Aitana has amassed a following of 350,000 on various platforms. Her popularity has led to lucrative brand partnerships, with companies reportedly paying £1,000 per promotional post. The emergence of AI influencers like Aitana has sparked a mix of admiration and controversy. Proponents argue that virtual models offer brands a unique and innovative way to engage with audiences, providing consistency and control over brand image. Additionally, AI influencers can be available 24/7 and are not subject to the limitations and demands of human counterparts. However, critics express concerns about the potential displacement of human models and the ethical implications of promoting products through computer-generated personas. There is also apprehension about the authenticity and transparency of interactions between AI influencers and their followers. Diana Nunez, the creator behind Aitana and founder of Clueless AI, emphasizes that while AI models present new opportunities, they should complement rather than replace human talent in the fashion industry. Nunez envisions a future where virtual and human influencers coexist, each bringing unique value to the table. As AI technology continues to evolve, the presence of virtual influencers like Aitana López is likely to become more prevalent, prompting ongoing discussions about their role and impact in the digital age.",
    imageUrl: "https://static.euronews.com/articles/stories/08/05/91/16/808x603_cmsv2_1ec54b54-4d0a-563e-92e3-bdc8dd66e915-8059116.jpg",
    category: "AI in Social Media",
    author: "David Kumar",
    date: "2023-11-10",
    likes: 1892,
    comments: 208,
    saved: false,
    liked: false,
    trending: true,
    featured: false
  },
  {
    id: 6,
    title: "AI 'Younger Self' Videos Go Viral on Social Media",
    summary: "A new AI trend called 'Met Myself for Coffee' is taking social media by storm, allowing users to create videos where they interact with their younger selves. Powered by the AI platform Pika, this feature combines current videos with past photos to produce realistic interactions, sparking both fascination and ethical debates.",
    content: "The 'Met Myself for Coffee' trend has recently gained immense popularity across various social media platforms. This innovative concept enables individuals to create videos in which they appear to meet and converse with their younger selves, offering a unique medium for self-reflection and storytelling. The technology behind this trend is developed by Pika, an AI-driven video platform. Pika's 'Selfie With Your Younger Self' feature seamlessly merges contemporary videos with historical photos or AI-generated childhood images to craft lifelike interactions. Users can upload a current video and a past photo, and the AI processes these inputs to generate a cohesive video depicting the user engaging with their younger version. The trend has seen participation from internet celebrities and everyday users alike, showcasing the tool's versatility and widespread appeal. Notably, individuals have utilized this feature to narrate personal growth stories, honor their heritage, or even create virtual reunions with deceased loved ones. While the technology offers creative and therapeutic possibilities, it also raises ethical considerations. Concerns about data privacy, the psychological impact of interacting with a digital younger self, and the potential for misuse in creating deceptive content are topics of ongoing discussion. As AI continues to advance, trends like 'Met Myself for Coffee' exemplify the profound ways in which technology can intersect with personal expression and social interaction.",
    imageUrl: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-560w,f_auto,q_auto:best/rockcms/2025-02/250214-coffee-self-tiktok-trend-jg-62c729.jpg",
    category: "AI in Social Media",
    author: "James Wong",
    date: "2025-03-30",
    likes: 3411,
    comments: 452,
    saved: false,
    liked: false,
    trending: true,
    featured: false
  },
  {
    id: 7,
    title: "Samsung's AI-Powered Vacuum Alerts Users to Calls and Texts",
    summary: "Samsung has unveiled the Bespoke AI Jet Ultra, a cordless stick vacuum equipped with an LCD screen that notifies users of incoming phone calls and text messages. Priced at $1,099, this vacuum offers 400AW suction power and a 100-minute battery life, integrating smart home technology with household cleaning.",
    content: "Samsung has introduced the Bespoke AI Jet Ultra, a cutting-edge cordless stick vacuum that merges advanced cleaning capabilities with smart home integration. This innovative appliance features an LCD display designed to alert users about incoming phone calls and text messages, ensuring that important communications are not missed during household chores. Beyond its smart notification system, the Bespoke AI Jet Ultra boasts impressive cleaning performance. It delivers 400AW of suction power, capable of tackling various cleaning tasks with ease. The vacuum also offers a substantial 100-minute battery life, allowing users to clean larger areas without frequent recharging. The integration of AI technology into household appliances reflects Samsung's commitment to enhancing user convenience and connectivity within the smart home ecosystem. By enabling the vacuum to sync with smartphones via the SmartThings app, users can receive real-time notifications directly on the vacuum's display. This feature is compatible with both Android and iOS devices, requiring a Samsung account for setup. While the Bespoke AI Jet Ultra represents a significant advancement in home appliance technology, it also raises considerations about the longevity and practicality of integrating screens into household devices. Users may ponder the potential for obsolescence, the risk of malfunctions, and the overall necessity of such features in everyday appliances. Nevertheless, Samsung's latest offering exemplifies the growing trend of incorporating AI and smart technology into home cleaning solutions, aiming to provide users with a more connected and efficient household experience.",
    imageUrl: "https://img.global.news.samsung.com/ca/wp-content/uploads/2023/06/bespoke-jet_ai_kv_pc_notext.jpg",
    category: "AI in Home Appliances",
    author: "Ana Ferreira",
    date: "2025-03-30",
    likes: 5126,
    comments: 324,
    saved: true,
    liked: false,
    trending: false,
    featured: true
  }
];

export const breakingNews = [
  "Breaking: Global stock markets rally as inflation fears ease",
  "Just in: Major technological breakthrough in fusion energy announced",
  "Alert: Tropical storm developing in the Atlantic, coastal warnings issued",
  "Update: International Space Station successfully completes critical repairs",
  "Developing story: Diplomatic breakthrough in Middle East peace negotiations"
];
