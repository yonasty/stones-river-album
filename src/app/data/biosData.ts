import jeremyImage from '../../../assets/New Bio Images/NEW_Jeremy_Kittel_Bio_Image-1.jpg';
import ericImage from '../../../assets/New Bio Images/Eric_Jacobsen_Bio_Image.jpg';
import opoImage from '../../../assets/New Bio Images/NEW_OPO_BIO_IMAGE.jpg';

export interface BioData {
  id: string;
  name: string;
  /** Role/title shown under the name (omit for self-explanatory entries like the orchestra) */
  role?: string;
  /** Path to bio image asset */
  image: string;
  /** Accessible alt text for the image */
  imageAlt: string;
  /** Full bio text — replace placeholder with final copy from client */
  bioText: string;
  /** Photo credit line shown under the image in the modal (omit when no credit is required) */
  photoCredit?: string;
  /** External website URL, opens in new tab */
  websiteUrl: string;
}

export const collaborators: BioData[] = [
  {
    id: 'jeremy-kittel',
    name: 'Jeremy Kittel',
    role: 'Composer, Fiddler, Violinist',
    image: jeremyImage,
    imageAlt: 'Jeremy Kittel portrait',
    bioText: 'Jeremy Kittel is an American composer, violinist, and fiddler. He received a Grammy nomination for "Best Instrumental Composition" in 2019 alongside John Williams and Terence Blanchard. Fluent in multiple musical genres, he composes original music that draws from a wide variety of influences including folk, jazz, Celtic, Classical, electronic, and more.\n\nKittel performs with his group Kittel & Co., as a soloist with orchestras, and in collaborative and supporting roles with many of today\'s leading artists. In demand as a composer and arranger, he has worked with Abigail Washburn and Bela Fleck, Zedd, My Morning Jacket, Aoife O\'Donovan, Shawn Mendes, Theo Katzman, Jars of Clay, Yo-Yo Ma, Jon Batiste, Renee Fleming, and the Grammy-winning Turtle Island Quartet (of which he was a member for five years). He has also recorded with artists such as Edgar Meyer, Chris Thile, Fleet Foxes, and Esperanza Spalding.',
    websiteUrl: 'https://jeremykittel.com/',
  },
  {
    id: 'eric-jacobsen',
    name: 'Eric Jacobsen',
    role: 'Music Director, Orlando Philharmonic Orchestra',
    image: ericImage,
    imageAlt: 'Eric Jacobsen portrait',
    bioText: 'Already well-established as one of classical music\'s most exciting and innovative young conductors, Eric Jacobsen has built a reputation for engaging audiences with innovative and collaborative programming. Eric is Music Director at both the Virginia Symphony orchestra and Orlando Philharmonic Orchestra, as well as the Principal Guest Conductor of the Classical Tahoe Musical Festival. Eric brings joy, storytelling, and a touch of humor to what he describes as "musical conversations" that delight audiences around the world, including those who do not traditionally attend classical music concerts.',
    photoCredit: 'Photo: Ben Van Hook',
    websiteUrl: 'https://www.jacobseneric.com/',
  },
  {
    id: 'orlando-philharmonic',
    name: 'Orlando Philharmonic Orchestra',
    image: opoImage,
    imageAlt: 'Orlando Philharmonic Orchestra',
    bioText: 'Established in 1993, Orlando Philharmonic Orchestra is led by Music Director Eric Jacobsen and is comprised of creative musicians and artists from around the world. The Philharmonic annually presents its Classics and Pops Series in Steinmetz Hall, along with its Focus Series and Symphony Storytime Series at the historic Plaza Live. More than 170 live concerts are presented each year, reaching over 70,000 children, youth, and families through its Young People\'s Concerts, Notes in Your Neighborhood program, and free outdoor community concerts. A resident company of the Dr. Phillips Center for the Performing Arts, the Philharmonic performs in the new Steinmetz Hall — one of the finest venues for acoustic music in the country — and is a Partner Organization of the National Alliance for Audition Support, an initiative to increase diversity in American orchestras.',
    photoCredit: 'Photo courtesy of Orlando Philharmonic',
    websiteUrl: 'https://orlandophil.org/',
  },
];
