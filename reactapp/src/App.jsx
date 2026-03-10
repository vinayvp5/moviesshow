import { useState, useContext, createContext } from "react";
import { Search, Heart, Home as HomeIcon, Star, ArrowLeft, Film, X } from "lucide-react";

const TMDB = "https://image.tmdb.org/t/p/w500";

const ALL_MOVIES = [
  { id:1,  title:"The Grand Budapest Hotel", genre:"Comedy",    year:2014, rating:8.1, duration:"99 min",  director:"Wes Anderson",           cast:"Ralph Fiennes, Tony Revolori",            description:"A concierge at a famous European hotel becomes involved in the theft of a priceless Renaissance painting and the murder of its elderly owner.", image:TMDB+"/nX5XotM9yprCKarRH4fzOq1VM1J.jpg" },
  { id:2,  title:"Superbad",                 genre:"Comedy",    year:2007, rating:7.6, duration:"113 min", director:"Greg Mottola",            cast:"Jonah Hill, Michael Cera",                description:"Two co-dependent high school seniors deal with separation anxiety after their plan to lose their virginity the night of graduation fails.", image:TMDB+"/ek8e8txUyUwd2BNqj6lFEerJfbqs.jpg" },
  { id:3,  title:"Home Alone",               genre:"Comedy",    year:1990, rating:7.7, duration:"103 min", director:"Chris Columbus",          cast:"Macaulay Culkin, Joe Pesci",              description:"An 8-year-old must protect his house from burglars when accidentally left home alone by his family during Christmas vacation.", image:TMDB+"/onTSipZ8R3bliBdKfPtsDuHTdlL.jpg" },
  { id:4,  title:"The Hangover",             genre:"Comedy",    year:2009, rating:7.7, duration:"100 min", director:"Todd Phillips",           cast:"Bradley Cooper, Zach Galifianakis",       description:"Three buddies wake up from a bachelor party in Las Vegas with no memory of the previous night and the bachelor missing.", image:TMDB+"/uluhlXubGu1VxU63boEZx3oEAqm.jpg" },
  { id:5,  title:"Mean Girls",               genre:"Comedy",    year:2004, rating:7.1, duration:"97 min",  director:"Mark Waters",             cast:"Lindsay Lohan, Rachel McAdams",           description:"Cady Heron is a hit with The Plastics at her new school, until she falls for Aaron Samuels, the ex of queen bee Regina George.", image:TMDB+"/fhIoOS7GacMfPlwyKrHR4j3gFtN.jpg" },
  { id:6,  title:"Bridesmaids",              genre:"Comedy",    year:2011, rating:6.8, duration:"125 min", director:"Paul Feig",               cast:"Kristen Wiig, Maya Rudolph",              description:"Competition between the maid of honor and a bridesmaid over who is the bride's best friend threatens to upend the life of an out-of-luck woman.", image:TMDB+"/4WNJIbf3pOkPvkN0kFb9M7aDMqw.jpg" },
  { id:7,  title:"Groundhog Day",            genre:"Comedy",    year:1993, rating:8.0, duration:"101 min", director:"Harold Ramis",            cast:"Bill Murray, Andie MacDowell",            description:"A narcissistic TV weatherman finds himself inexplicably repeating the same Groundhog Day over and over again.", image:TMDB+"/gSub9Gr5h5sEH8KBdq3qVQVNVHN.jpg" },
  { id:8,  title:"Ferris Buellers Day Off",  genre:"Comedy",    year:1986, rating:7.8, duration:"103 min", director:"John Hughes",             cast:"Matthew Broderick, Alan Ruck",            description:"A high school wise guy is determined to have a day off from school, despite what the Principal thinks.", image:TMDB+"/mEbCTHBLWb2GFLuCABbXoTVJ6PJ.jpg" },
  { id:9,  title:"The Nice Guys",            genre:"Comedy",    year:2016, rating:7.4, duration:"116 min", director:"Shane Black",             cast:"Russell Crowe, Ryan Gosling",             description:"In 1970s Los Angeles, a mismatched pair of private eyes investigate a missing girl and the accidental death of a porn star.", image:TMDB+"/pPMxCGLfgLxuCsGYbKCP4PdNOnY.jpg" },
  { id:10, title:"Game Night",               genre:"Comedy",    year:2018, rating:7.0, duration:"100 min", director:"John Francis Daley",      cast:"Jason Bateman, Rachel McAdams",           description:"Friends at a game night find themselves entangled in a real-life mystery when the shady brother of one is seemingly kidnapped.", image:TMDB+"/2YHvNa1PnLNNFZYHEpHKFcDdLa6.jpg" },
  { id:11, title:"Mad Max Fury Road",        genre:"Action",    year:2015, rating:8.1, duration:"120 min", director:"George Miller",           cast:"Tom Hardy, Charlize Theron",              description:"In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of female prisoners and a drifter named Max.", image:TMDB+"/8tZYtuWezp3JoE8SP84p6AHMf4n.jpg" },
  { id:12, title:"John Wick",                genre:"Action",    year:2014, rating:7.4, duration:"101 min", director:"Chad Stahelski",          cast:"Keanu Reeves, Michael Nyqvist",           description:"An ex-hitman comes out of retirement to track down the gangsters that killed his dog and took everything from him.", image:TMDB+"/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg" },
  { id:13, title:"Die Hard",                 genre:"Action",    year:1988, rating:8.2, duration:"132 min", director:"John McTiernan",          cast:"Bruce Willis, Alan Rickman",              description:"An NYPD officer tries to save his wife and several others taken hostage by German terrorists during a Christmas party at Nakatomi Plaza.", image:TMDB+"/yFihWxQcmqcaBR31QM6Y8gT6aYV.jpg" },
  { id:14, title:"The Dark Knight",          genre:"Action",    year:2008, rating:9.0, duration:"152 min", director:"Christopher Nolan",       cast:"Christian Bale, Heath Ledger",            description:"When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.", image:TMDB+"/qJ2tW6WMUDux911r6m7haRef0WH.jpg" },
  { id:15, title:"Mission Impossible",       genre:"Action",    year:1996, rating:7.1, duration:"110 min", director:"Brian De Palma",          cast:"Tom Cruise, Jon Voight",                  description:"An American agent under false suspicion of disloyalty must discover and expose the real spy without the help of his organization.", image:TMDB+"/gSCb72uFXUQ3ybKxvHqYQnp4VNq.jpg" },
  { id:16, title:"Top Gun Maverick",         genre:"Action",    year:2022, rating:8.3, duration:"130 min", director:"Joseph Kosinski",         cast:"Tom Cruise, Miles Teller",                description:"After 30 years of service as one of the Navy's top aviators, Pete Mitchell pushes the envelope as a courageous test pilot while facing his past.", image:TMDB+"/62HCnUTHJaFltOggHDiA1zMORlN.jpg" },
  { id:17, title:"The Matrix",               genre:"Action",    year:1999, rating:8.7, duration:"136 min", director:"The Wachowskis",          cast:"Keanu Reeves, Laurence Fishburne",        description:"A computer hacker learns about the true nature of his reality and his role in the war against its controllers.", image:TMDB+"/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg" },
  { id:18, title:"Gladiator",                genre:"Action",    year:2000, rating:8.5, duration:"155 min", director:"Ridley Scott",            cast:"Russell Crowe, Joaquin Phoenix",          description:"A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.", image:TMDB+"/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg" },
  { id:19, title:"Inception",                genre:"Action",    year:2010, rating:8.8, duration:"148 min", director:"Christopher Nolan",       cast:"Leonardo DiCaprio, Joseph Gordon-Levitt", description:"A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.", image:TMDB+"/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg" },
  { id:20, title:"Speed",                    genre:"Action",    year:1994, rating:7.3, duration:"116 min", director:"Jan de Bont",             cast:"Keanu Reeves, Sandra Bullock",            description:"A young police officer must prevent a bomb exploding aboard a city bus by keeping its speed above 50 mph.", image:TMDB+"/iAzQ6e9GJNbNmIAYEEumkrBCENp.jpg" },
  { id:21, title:"Raiders of the Lost Ark",  genre:"Adventure", year:1981, rating:8.4, duration:"115 min", director:"Steven Spielberg",        cast:"Harrison Ford, Karen Allen",              description:"Archaeologist Indiana Jones is hired by the US government to find the Ark of the Covenant before the Nazis.", image:TMDB+"/ceG9VzoRAVGwivFU403Wc3AHRys.jpg" },
  { id:22, title:"Jurassic Park",            genre:"Adventure", year:1993, rating:8.2, duration:"127 min", director:"Steven Spielberg",        cast:"Sam Neill, Laura Dern",                   description:"A paleontologist visiting an almost complete theme park must protect kids after a power failure causes cloned dinosaurs to run loose.", image:TMDB+"/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg" },
  { id:23, title:"The Lion King",            genre:"Adventure", year:1994, rating:8.5, duration:"88 min",  director:"Roger Allers",            cast:"Matthew Broderick, Jeremy Irons",         description:"A Lion cub crown prince is tricked by his uncle into thinking he caused his father's death and flees into exile in despair.", image:TMDB+"/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg" },
  { id:24, title:"Pirates of the Caribbean", genre:"Adventure", year:2003, rating:8.0, duration:"143 min", director:"Gore Verbinski",          cast:"Johnny Depp, Orlando Bloom",              description:"Will Turner teams up with eccentric pirate Captain Jack Sparrow to rescue his love from the cursed crew of a black ship.", image:TMDB+"/tKHjfepPNxCqKrMQQpf2ZQZIN3.jpg" },
  { id:25, title:"The Revenant",             genre:"Adventure", year:2015, rating:8.0, duration:"156 min", director:"Alejandro Inarritu",       cast:"Leonardo DiCaprio, Tom Hardy",            description:"A frontiersman in the 1820s fights for survival after being mauled by a bear and left for dead by members of his own hunting team.", image:TMDB+"/ji3ecJohZjn3ooDox7n6TtVGbCq.jpg" },
  { id:26, title:"Cast Away",                genre:"Adventure", year:2000, rating:7.8, duration:"143 min", director:"Robert Zemeckis",         cast:"Tom Hanks, Helen Hunt",                   description:"A FedEx executive undergoes a physical and emotional transformation after crash landing on a deserted island.", image:TMDB+"/xBKGJQKAefPpPtQFoVoGUuVMSmV.jpg" },
  { id:27, title:"Into the Wild",            genre:"Adventure", year:2007, rating:8.1, duration:"148 min", director:"Sean Penn",               cast:"Emile Hirsch, Marcia Gay Harden",         description:"After graduating, Christopher McCandless abandons his possessions and hitchhikes to Alaska to live in the wilderness.", image:TMDB+"/cMFMpSMnInMGMzqBXcXFAO8JK1Q.jpg" },
  { id:28, title:"The Lord of the Rings",    genre:"Adventure", year:2001, rating:8.8, duration:"178 min", director:"Peter Jackson",           cast:"Elijah Wood, Ian McKellen",               description:"A meek Hobbit and eight companions set out to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.", image:TMDB+"/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg" },
  { id:29, title:"Avatar",                   genre:"Adventure", year:2009, rating:7.9, duration:"162 min", director:"James Cameron",           cast:"Sam Worthington, Zoe Saldana",            description:"A paraplegic Marine on Pandora becomes torn between following his orders and protecting the world he feels is his home.", image:TMDB+"/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg" },
  { id:30, title:"Moana",                    genre:"Adventure", year:2016, rating:7.6, duration:"107 min", director:"Ron Clements",            cast:"Dwayne Johnson, Auli'i Cravalho",         description:"In Ancient Polynesia, Moana answers the Ocean's call to seek out the Demigod Maui to lift a terrible curse from her island.", image:TMDB+"/4CSoiXvmBXpjCoGGMdwfhCvxSnV.jpg" },
  { id:31, title:"The Shawshank Redemption", genre:"Drama",     year:1994, rating:9.3, duration:"142 min", director:"Frank Darabont",          cast:"Tim Robbins, Morgan Freeman",             description:"Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", image:TMDB+"/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg" },
  { id:32, title:"Forrest Gump",             genre:"Drama",     year:1994, rating:8.8, duration:"142 min", director:"Robert Zemeckis",         cast:"Tom Hanks, Robin Wright",                 description:"The presidencies of Kennedy and Johnson, Vietnam, and other historical events unfold from the perspective of an Alabama man with an IQ of 75.", image:TMDB+"/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg" },
  { id:33, title:"Schindlers List",          genre:"Drama",     year:1993, rating:9.0, duration:"195 min", director:"Steven Spielberg",        cast:"Liam Neeson, Ben Kingsley",               description:"In German-occupied Poland, industrialist Oskar Schindler becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.", image:TMDB+"/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg" },
  { id:34, title:"Good Will Hunting",        genre:"Drama",     year:1997, rating:8.3, duration:"126 min", director:"Gus Van Sant",            cast:"Matt Damon, Robin Williams",              description:"Will Hunting, a janitor at MIT, has a gift for mathematics but needs help from a psychologist to find direction in his life.", image:TMDB+"/bABCBKYBK7A5G1x1UTSjB154Klp.jpg" },
  { id:35, title:"A Beautiful Mind",         genre:"Drama",     year:2001, rating:8.2, duration:"135 min", director:"Ron Howard",              cast:"Russell Crowe, Jennifer Connelly",        description:"After brilliant mathematician John Nash accepts secret work in cryptography, his life takes a dramatic and nightmarish turn.", image:TMDB+"/zwzWCmH72OSC9NA0ipoqynmMRvA.jpg" },
  { id:36, title:"The Pursuit of Happyness", genre:"Drama",     year:2006, rating:8.0, duration:"117 min", director:"Gabriele Muccino",        cast:"Will Smith, Jaden Smith",                 description:"A struggling salesman takes custody of his son as he is poised to begin a life-changing professional endeavor.", image:TMDB+"/lBbEnMNg3OibBnkBHHEGHHwKkep.jpg" },
  { id:37, title:"12 Years a Slave",         genre:"Drama",     year:2013, rating:8.1, duration:"134 min", director:"Steve McQueen",           cast:"Chiwetel Ejiofor, Michael Fassbender",    description:"In the antebellum United States, Solomon Northup, a free Black man from upstate New York, is abducted and sold into slavery.", image:TMDB+"/xdANQijuNrJpCN5ZPDKODDkAEcP.jpg" },
  { id:38, title:"Marriage Story",           genre:"Drama",     year:2019, rating:7.9, duration:"137 min", director:"Noah Baumbach",           cast:"Adam Driver, Scarlett Johansson",         description:"A stage director and his actor wife struggle through a gruelling coast-to-coast divorce that pushes them to their personal and creative extremes.", image:TMDB+"/pZekG6xabTmZxjmHzDMJTKAFCAj.jpg" },
  { id:39, title:"Moonlight",                genre:"Drama",     year:2016, rating:7.4, duration:"111 min", director:"Barry Jenkins",           cast:"Trevante Rhodes, Mahershala Ali",         description:"A young African-American man grapples with his identity and sexuality while experiencing the everyday struggles of childhood, adolescence, and adulthood.", image:TMDB+"/4911T5FbJ9eAlnGLKKTJMsqCpMk.jpg" },
  { id:40, title:"Parasite",                 genre:"Drama",     year:2019, rating:8.5, duration:"132 min", director:"Bong Joon-ho",            cast:"Song Kang-ho, Lee Sun-kyun",              description:"Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.", image:TMDB+"/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg" },
  { id:41, title:"Se7en",                    genre:"Thriller",  year:1995, rating:8.6, duration:"127 min", director:"David Fincher",           cast:"Brad Pitt, Morgan Freeman",               description:"Two detectives hunt a serial killer who uses the seven deadly sins as his motives.", image:TMDB+"/69Sns8WoET6CfaYlIkHbla4l7nC.jpg" },
  { id:42, title:"Gone Girl",                genre:"Thriller",  year:2014, rating:8.1, duration:"149 min", director:"David Fincher",           cast:"Ben Affleck, Rosamund Pike",              description:"With his wife's disappearance having become the focus of an intense media circus, a man sees the spotlight turned on him when suspected of not being innocent.", image:TMDB+"/fynMkpErAMIzDxOdFMfNuD6Rqmd.jpg" },
  { id:43, title:"Silence of the Lambs",     genre:"Thriller",  year:1991, rating:8.6, duration:"118 min", director:"Jonathan Demme",          cast:"Jodie Foster, Anthony Hopkins",           description:"A young FBI cadet must receive the help of an incarcerated cannibal killer to catch another serial killer.", image:TMDB+"/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg" },
  { id:44, title:"Prisoners",                genre:"Thriller",  year:2013, rating:8.1, duration:"153 min", director:"Denis Villeneuve",        cast:"Hugh Jackman, Jake Gyllenhaal",           description:"When Keller Dover's daughter and her friend go missing, he takes matters into his own hands as police pursue multiple leads.", image:TMDB+"/46sh1pYOSBxBMRBOsUcnJ3DVRkL.jpg" },
  { id:45, title:"Zodiac",                   genre:"Thriller",  year:2007, rating:7.7, duration:"157 min", director:"David Fincher",           cast:"Jake Gyllenhaal, Mark Ruffalo",           description:"A San Francisco cartoonist becomes an amateur detective obsessed with tracking down the Zodiac Killer who taunted police with cryptic messages.", image:TMDB+"/riPKFrAPkqsDsxTMvL3DkrD3OvZ.jpg" },
  { id:46, title:"No Country for Old Men",   genre:"Thriller",  year:2007, rating:8.1, duration:"122 min", director:"Coen Brothers",           cast:"Tommy Lee Jones, Javier Bardem",          description:"Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and more than two million dollars in cash near the Rio Grande.", image:TMDB+"/6d5XOczc506UxSHDdCMFwmNPSHn.jpg" },
  { id:47, title:"Memento",                  genre:"Thriller",  year:2000, rating:8.4, duration:"113 min", director:"Christopher Nolan",       cast:"Guy Pearce, Carrie-Anne Moss",            description:"A man with short-term memory loss attempts to track down his wife's murderer using notes and tattoos he has made to himself.", image:TMDB+"/yuNs09hvpHVU1cXnO8moCOgAQPu.jpg" },
  { id:48, title:"Knives Out",               genre:"Thriller",  year:2019, rating:7.9, duration:"130 min", director:"Rian Johnson",            cast:"Daniel Craig, Ana de Armas",              description:"A detective investigates the death of a patriarch of an eccentric combative family.", image:TMDB+"/pThyQovXQrpS44ScFzszjkPTfQG.jpg" },
  { id:49, title:"Shutter Island",           genre:"Thriller",  year:2010, rating:8.1, duration:"138 min", director:"Martin Scorsese",         cast:"Leonardo DiCaprio, Mark Ruffalo",         description:"In 1954, a US Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane on a remote island.", image:TMDB+"/6bgBMSGJDdMoNDFXFOr6XOGRPBJ.jpg" },
  { id:50, title:"Get Out",                  genre:"Thriller",  year:2017, rating:7.7, duration:"104 min", director:"Jordan Peele",            cast:"Daniel Kaluuya, Allison Williams",        description:"A young African-American visits his white girlfriend's parents, where his simmering uneasiness about their reception builds to a terrifying climax.", image:TMDB+"/tfrYBQHyFDRPXEBrfJJqVcJxQWS.jpg" },
];

const GENRES = ["All","Comedy","Action","Adventure","Drama","Thriller"];
const GC = {
  Comedy:    { bg:"rgba(251,191,36,0.15)", border:"rgba(251,191,36,0.45)", text:"#fbbf24", icon:"😂" },
  Action:    { bg:"rgba(239,68,68,0.15)",  border:"rgba(239,68,68,0.45)",  text:"#f87171", icon:"💥" },
  Adventure: { bg:"rgba(52,211,153,0.15)", border:"rgba(52,211,153,0.45)", text:"#34d399", icon:"🌍" },
  Drama:     { bg:"rgba(139,92,246,0.15)", border:"rgba(139,92,246,0.45)", text:"#a78bfa", icon:"🎭" },
  Thriller:  { bg:"rgba(249,115,22,0.15)", border:"rgba(249,115,22,0.45)", text:"#fb923c", icon:"🔪" },
};

const Ctx = createContext();

function AppProvider({ children }) {
  const [page, setPage] = useState("home");
  const [movie, setMovie] = useState(null);
  const [favs, setFavs] = useState([]);
  const [q, setQ] = useState("");
  const go = (p, m = null) => { setPage(p); if (m) setMovie(m); };
  const toggleFav = (m) => setFavs(prev => prev.find(f => f.id === m.id) ? prev.filter(f => f.id !== m.id) : [...prev, m]);
  const isFav = (id) => favs.some(f => f.id === id);
  return <Ctx.Provider value={{ page, go, movie, favs, toggleFav, isFav, q, setQ }}>{children}</Ctx.Provider>;
}

function Poster({ src, title, width = 158, height = 225, radius = 0 }) {
  const [err, setErr] = useState(false);
  const genre = ALL_MOVIES.find(m => m.title === title)?.genre;
  const gc = GC[genre] || { bg:"#1a1a2e", border:"#2a2a40", text:"#888", icon:"🎬" };
  if (err) return (
    <div style={{ width, height, borderRadius:radius, background:"linear-gradient(160deg,#0f0f25,#1a1a35)", border:`1px solid ${gc.border}`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:8, padding:"0 10px", flexShrink:0 }}>
      <span style={{ fontSize:"2.2rem" }}>{gc.icon}</span>
      <span style={{ color:gc.text, fontWeight:"700", textAlign:"center", fontSize:"0.75rem", lineHeight:1.3 }}>{title}</span>
    </div>
  );
  return <img src={src} alt={title} onError={() => setErr(true)} style={{ width, height, objectFit:"cover", borderRadius:radius, display:"block", flexShrink:0 }} />;
}

function Navbar() {
  const { go, page, favs } = useContext(Ctx);
  const nb = (a) => ({ padding:"7px 14px", borderRadius:"8px", border:"none", cursor:"pointer", fontSize:"0.82rem", fontWeight:"600", display:"flex", alignItems:"center", gap:"6px", background:a?"rgba(239,68,68,0.2)":"transparent", color:a?"#f87171":"rgba(255,255,255,0.5)" });
  return (
    <nav style={{ position:"sticky", top:0, zIndex:999, background:"rgba(5,5,15,0.97)", backdropFilter:"blur(24px)", borderBottom:"1px solid rgba(255,255,255,0.07)", padding:"0 1.5rem", height:"56px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <div onClick={() => go("home")} style={{ cursor:"pointer", display:"flex", alignItems:"center", gap:"8px", background:"linear-gradient(135deg,#f87171,#fbbf24)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", fontWeight:"800", fontSize:"1.3rem", fontFamily:"Georgia,serif" }}>
        <Film size={18} color="#f87171" /> CineDB
      </div>
      <div style={{ display:"flex", gap:"3px" }}>
        <button style={nb(page==="home")} onClick={() => go("home")}><HomeIcon size={13} /> Home</button>
        <button style={nb(page==="search")} onClick={() => go("search")}><Search size={13} /> Search</button>
        <button style={nb(page==="favorites")} onClick={() => go("favorites")}>
          <Heart size={13} fill={favs.length>0?"#f87171":"none"} color={favs.length>0?"#f87171":"currentColor"} /> Favs
          {favs.length > 0 && <span style={{ background:"#dc2626", borderRadius:"999px", padding:"1px 6px", fontSize:"0.68rem" }}>{favs.length}</span>}
        </button>
      </div>
    </nav>
  );
}

function MovieCard({ m }) {
  const { go, toggleFav, isFav } = useContext(Ctx);
  const [hov, setHov] = useState(false);
  const fav = isFav(m.id);
  const gc = GC[m.genre];
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={() => go("detail", m)}
      style={{ width:158, borderRadius:12, overflow:"hidden", cursor:"pointer", background:"#0d0d1f", position:"relative", flexShrink:0, transform:hov?"translateY(-8px) scale(1.03)":"none", boxShadow:hov?"0 32px 64px rgba(0,0,0,0.85),0 0 0 1px rgba(248,113,113,0.25)":"0 4px 20px rgba(0,0,0,0.5)", transition:"all 0.28s cubic-bezier(0.34,1.4,0.64,1)" }}>
      <Poster src={m.image} title={m.title} width={158} height={225} radius={0} />
      <div style={{ position:"absolute", top:8, left:8, background:gc.bg, border:`1px solid ${gc.border}`, borderRadius:6, padding:"2px 8px", fontSize:"0.62rem", fontWeight:"700", color:gc.text, backdropFilter:"blur(8px)" }}>{m.genre}</div>
      <button onClick={(e) => { e.stopPropagation(); toggleFav(m); }} style={{ position:"absolute", top:8, right:8, width:28, height:28, borderRadius:"50%", background:"rgba(0,0,0,0.75)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <Heart size={12} fill={fav?"#f87171":"none"} color={fav?"#f87171":"rgba(255,255,255,0.6)"} />
      </button>
      <div style={{ position:"absolute", bottom:62, right:8, background:"rgba(0,0,0,0.82)", borderRadius:6, padding:"2px 7px", fontSize:"0.68rem", fontWeight:"700", color:"#fbbf24", display:"flex", alignItems:"center", gap:3 }}>
        <Star size={8} fill="#fbbf24" color="#fbbf24" /> {m.rating}
      </div>
      <div style={{ padding:"10px 10px 12px" }}>
        <p style={{ margin:0, fontWeight:"700", fontSize:"0.8rem", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", color:"rgba(255,255,255,0.95)" }}>{m.title}</p>
        <p style={{ margin:"3px 0 0", fontSize:"0.7rem", color:"rgba(255,255,255,0.35)" }}>{m.year}</p>
      </div>
    </div>
  );
}

function GenreRow({ genre }) {
  const movies = ALL_MOVIES.filter(m => m.genre === genre);
  const gc = GC[genre];
  return (
    <div style={{ marginBottom:"2.5rem" }}>
      <div style={{ display:"flex", alignItems:"center", marginBottom:"1rem", gap:10 }}>
        <span style={{ fontSize:"1.3rem" }}>{gc.icon}</span>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:"1.2rem", fontWeight:"700", margin:0 }}>{genre}</h2>
        <span style={{ background:gc.bg, border:`1px solid ${gc.border}`, borderRadius:"999px", padding:"1px 10px", fontSize:"0.7rem", fontWeight:"700", color:gc.text }}>{movies.length} films</span>
      </div>
      <div style={{ display:"flex", gap:14, overflowX:"auto", paddingBottom:8 }}>
        {movies.map(m => <MovieCard key={m.id} m={m} />)}
      </div>
    </div>
  );
}

function HomePage() {
  const { go } = useContext(Ctx);
  const hero = ALL_MOVIES.find(m => m.id === 14);
  const gc = GC[hero.genre];
  return (
    <div style={{ padding:"1.5rem 1.5rem 4rem" }}>
      <div style={{ borderRadius:18, overflow:"hidden", marginBottom:"2.5rem", position:"relative", minHeight:360 }}>
        <img src={hero.image} alt={hero.title} onError={(e) => { e.target.style.opacity=0; }} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(105deg,rgba(5,5,15,0.98) 30%,rgba(5,5,15,0.7) 60%,rgba(5,5,15,0.15) 100%)" }} />
        <div style={{ position:"relative", padding:"2.5rem", maxWidth:520, display:"flex", flexDirection:"column", justifyContent:"flex-end", minHeight:360 }}>
          <span style={{ background:gc.bg, border:`1px solid ${gc.border}`, color:gc.text, borderRadius:"999px", padding:"3px 13px", fontSize:"0.73rem", fontWeight:"700", display:"inline-block", marginBottom:10, width:"fit-content" }}>{gc.icon} {hero.genre}</span>
          <h1 style={{ fontFamily:"Georgia,serif", fontSize:"2.5rem", fontWeight:"800", margin:"0 0 8px", lineHeight:1.1, color:"white" }}>{hero.title}</h1>
          <div style={{ display:"flex", gap:14, marginBottom:12, fontSize:"0.85rem" }}>
            <span style={{ color:"#fbbf24", fontWeight:"700", display:"flex", alignItems:"center", gap:4 }}><Star size={12} fill="#fbbf24" color="#fbbf24" /> {hero.rating}/10</span>
            <span style={{ color:"rgba(255,255,255,0.4)" }}>📅 {hero.year}</span>
            <span style={{ color:"rgba(255,255,255,0.4)" }}>⏱ {hero.duration}</span>
          </div>
          <p style={{ color:"rgba(255,255,255,0.6)", fontSize:"0.88rem", lineHeight:1.65, marginBottom:"1.4rem" }}>{hero.description.slice(0,155)}...</p>
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={() => go("detail", hero)} style={{ background:"linear-gradient(135deg,#dc2626,#b91c1c)", border:"none", borderRadius:9, padding:"10px 22px", color:"white", fontWeight:"700", cursor:"pointer", fontSize:"0.88rem" }}>▶ View Details</button>
            <button onClick={() => go("search")} style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:9, padding:"10px 22px", color:"rgba(255,255,255,0.8)", fontWeight:"700", cursor:"pointer", fontSize:"0.88rem" }}>🔍 Search</button>
          </div>
        </div>
      </div>
      <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:"2.5rem" }}>
        {GENRES.filter(g => g !== "All").map(g => {
          const gc = GC[g];
          return (
            <div key={g} style={{ background:gc.bg, border:`1px solid ${gc.border}`, borderRadius:10, padding:"10px 18px", textAlign:"center", minWidth:76 }}>
              <p style={{ margin:0, fontSize:"1.3rem", fontWeight:"800", color:gc.text }}>10</p>
              <p style={{ margin:"2px 0 0", fontSize:"0.7rem", color:"rgba(255,255,255,0.45)", fontWeight:"600" }}>{g}</p>
            </div>
          );
        })}
        <div style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, padding:"10px 18px", textAlign:"center", minWidth:76 }}>
          <p style={{ margin:0, fontSize:"1.3rem", fontWeight:"800", color:"white" }}>50</p>
          <p style={{ margin:"2px 0 0", fontSize:"0.7rem", color:"rgba(255,255,255,0.45)", fontWeight:"600" }}>Total</p>
        </div>
      </div>
      {GENRES.filter(g => g !== "All").map(g => <GenreRow key={g} genre={g} />)}
    </div>
  );
}

function SearchPage() {
  const { go, q, setQ } = useContext(Ctx);
  const [local, setLocal] = useState(q);
  const [gf, setGf] = useState("All");
  const results = ALL_MOVIES.filter(m => {
    const s = local.toLowerCase();
    return (!s || m.title.toLowerCase().includes(s) || m.genre.toLowerCase().includes(s) || m.cast.toLowerCase().includes(s) || m.director.toLowerCase().includes(s) || String(m.year).includes(s)) && (gf === "All" || m.genre === gf);
  });
  return (
    <div style={{ padding:"2rem 1.5rem 4rem" }}>
      <h1 style={{ fontFamily:"Georgia,serif", fontSize:"1.8rem", fontWeight:"700", marginBottom:"1.2rem", color:"white" }}>🔍 Search Movies</h1>
      <div style={{ position:"relative", marginBottom:"1rem" }}>
        <Search size={15} style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:"rgba(255,255,255,0.35)" }} />
        <input value={local} onChange={(e) => { setLocal(e.target.value); setQ(e.target.value); }} placeholder="Search title, genre, director, cast or year..."
          style={{ width:"100%", padding:"13px 44px 13px 42px", borderRadius:11, border:"1px solid rgba(255,255,255,0.1)", background:"#0d0d1f", color:"white", fontSize:"0.95rem", outline:"none", boxSizing:"border-box" }} />
        {local && <button onClick={() => { setLocal(""); setQ(""); }} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,0.4)" }}><X size={15} /></button>}
      </div>
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:"1.5rem" }}>
        {GENRES.map(g => {
          const gc = g !== "All" ? GC[g] : null;
          const a = gf === g;
          return (
            <button key={g} onClick={() => setGf(g)} style={{ padding:"6px 16px", borderRadius:"999px", border:`1px solid ${a&&gc?gc.border:"rgba(255,255,255,0.12)"}`, background:a&&gc?gc.bg:a?"rgba(255,255,255,0.1)":"transparent", color:a&&gc?gc.text:a?"white":"rgba(255,255,255,0.45)", cursor:"pointer", fontSize:"0.8rem", fontWeight:"600" }}>
              {gc ? `${gc.icon} ` : ""}{g}
            </button>
          );
        })}
      </div>
      <p style={{ color:"rgba(255,255,255,0.3)", fontSize:"0.8rem", marginBottom:"1.2rem" }}>{results.length} movie{results.length!==1?"s":""} found</p>
      {results.length === 0
        ? <div style={{ textAlign:"center", marginTop:"4rem" }}><p style={{ fontSize:"3rem" }}>🎬</p><p style={{ color:"rgba(255,255,255,0.3)", marginTop:12 }}>No results for "{local}"</p></div>
        : <div style={{ display:"flex", flexWrap:"wrap", gap:14 }}>{results.map(m => <MovieCard key={m.id} m={m} />)}</div>
      }
    </div>
  );
}

function DetailPage() {
  const { movie: m, go, toggleFav, isFav } = useContext(Ctx);
  if (!m) return null;
  const fav = isFav(m.id);
  const gc = GC[m.genre];
  const related = ALL_MOVIES.filter(x => x.genre === m.genre && x.id !== m.id).slice(0, 5);
  return (
    <div style={{ padding:"1.5rem 1.5rem 5rem" }}>
      <button onClick={() => go("home")} style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, padding:"8px 16px", color:"rgba(255,255,255,0.65)", cursor:"pointer", display:"flex", alignItems:"center", gap:6, fontSize:"0.83rem", marginBottom:"1.8rem" }}>
        <ArrowLeft size={13} /> Back
      </button>
      <div style={{ display:"flex", gap:"2.5rem", flexWrap:"wrap", marginBottom:"3rem" }}>
        <Poster src={m.image} title={m.title} width={250} height={375} radius={16} />
        <div style={{ flex:1, minWidth:260 }}>
          <span style={{ background:gc.bg, border:`1px solid ${gc.border}`, color:gc.text, borderRadius:"999px", padding:"3px 13px", fontSize:"0.73rem", fontWeight:"700", display:"inline-block", marginBottom:12 }}>{gc.icon} {m.genre}</span>
          <h1 style={{ fontFamily:"Georgia,serif", fontSize:"2.3rem", fontWeight:"800", margin:"0 0 10px", lineHeight:1.1, color:"white" }}>{m.title}</h1>
          <div style={{ display:"flex", flexWrap:"wrap", gap:16, marginBottom:"1.2rem", fontSize:"0.87rem" }}>
            <span style={{ color:"#fbbf24", fontWeight:"700", display:"flex", alignItems:"center", gap:4 }}><Star size={13} fill="#fbbf24" color="#fbbf24" /> {m.rating}/10</span>
            <span style={{ color:"rgba(255,255,255,0.45)" }}>📅 {m.year}</span>
            <span style={{ color:"rgba(255,255,255,0.45)" }}>⏱ {m.duration}</span>
          </div>
          <p style={{ color:"rgba(255,255,255,0.65)", lineHeight:1.78, fontSize:"0.93rem", marginBottom:"1.3rem", maxWidth:600 }}>{m.description}</p>
          <div style={{ marginBottom:10, fontSize:"0.88rem" }}><span style={{ color:"rgba(255,255,255,0.35)" }}>🎬 Director: </span><span style={{ color:"rgba(255,255,255,0.9)", fontWeight:"600" }}>{m.director}</span></div>
          <div style={{ marginBottom:"1.5rem", fontSize:"0.88rem" }}><span style={{ color:"rgba(255,255,255,0.35)" }}>🎭 Cast: </span><span style={{ color:"rgba(255,255,255,0.7)" }}>{m.cast}</span></div>
          <button onClick={() => toggleFav(m)} style={{ background:fav?"rgba(220,38,38,0.2)":"rgba(255,255,255,0.06)", border:`1px solid ${fav?"rgba(248,113,113,0.5)":"rgba(255,255,255,0.12)"}`, borderRadius:10, padding:"11px 24px", color:fav?"#f87171":"rgba(255,255,255,0.8)", fontWeight:"700", cursor:"pointer", fontSize:"0.9rem", display:"flex", alignItems:"center", gap:8 }}>
            <Heart size={15} fill={fav?"#f87171":"none"} color={fav?"#f87171":"currentColor"} />{fav ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>
      {related.length > 0 && (
        <div>
          <h2 style={{ fontFamily:"Georgia,serif", fontSize:"1.2rem", fontWeight:"700", marginBottom:"1rem", color:"white" }}>More {m.genre} Movies</h2>
          <div style={{ display:"flex", gap:14, overflowX:"auto", paddingBottom:8 }}>{related.map(x => <MovieCard key={x.id} m={x} />)}</div>
        </div>
      )}
    </div>
  );
}

function FavoritesPage() {
  const { favs, go } = useContext(Ctx);
  return (
    <div style={{ padding:"2rem 1.5rem 4rem" }}>
      <h1 style={{ fontFamily:"Georgia,serif", fontSize:"1.8rem", fontWeight:"700", marginBottom:4, color:"white" }}>❤️ My Favorites</h1>
      <p style={{ color:"rgba(255,255,255,0.35)", fontSize:"0.85rem", marginBottom:"2rem" }}>{favs.length} saved movie{favs.length!==1?"s":""}</p>
      {favs.length === 0
        ? <div style={{ textAlign:"center", marginTop:"5rem" }}>
            <p style={{ fontSize:"4rem" }}>🎬</p>
            <p style={{ color:"rgba(255,255,255,0.35)", marginTop:12, marginBottom:6 }}>No favorites saved yet</p>
            <p style={{ color:"rgba(255,255,255,0.2)", fontSize:"0.85rem", marginBottom:"2rem" }}>Click the heart on any movie to save it here</p>
            <button onClick={() => go("home")} style={{ background:"linear-gradient(135deg,#dc2626,#b91c1c)", border:"none", borderRadius:9, padding:"11px 26px", color:"white", fontWeight:"700", cursor:"pointer" }}>Browse Movies</button>
          </div>
        : <div style={{ display:"flex", flexWrap:"wrap", gap:14 }}>{favs.map(m => <MovieCard key={m.id} m={m} />)}</div>
      }
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Ctx.Consumer>{({ page }) => (
        <div style={{ minHeight:"100vh", background:"#05050f", color:"white", fontFamily:"Segoe UI,Helvetica Neue,sans-serif" }}>
          <style>{`*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-track{background:#0d0d1f}::-webkit-scrollbar-thumb{background:#2a2a40;border-radius:4px}input{font-family:inherit}`}</style>
          <Navbar />
          {page === "home" && <HomePage />}
          {page === "search" && <SearchPage />}
          {page === "detail" && <DetailPage />}
          {page === "favorites" && <FavoritesPage />}
        </div>
      )}</Ctx.Consumer>
    </AppProvider>
  );
}