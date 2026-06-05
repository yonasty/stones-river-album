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
  /** External website URL, opens in new tab */
  websiteUrl: string;
}

export const collaborators: BioData[] = [
  {
    id: 'eric-jacobsen',
    name: 'Eric Jacobsen',
    role: 'Conductor',
    image: ericImage,
    imageAlt: 'Eric Jacobsen portrait',
    bioText: 'Already well-established as one of classical music\'s most exciting and innovative young conductors, Eric Jacobsen has built a reputation for engaging audiences with innovative and collaborative programming. Eric is Music Director at both the Virginia Symphony orchestra and the Orlando Philharmonic Orchestra, as well as the Principal Guest Conductor of the Classical Tahoe Musical Festival.  Eric is also artistic director and co-founder of The Knights, the uniquely adventurous NYC-based chamber orchestra. Eric brings joy, storytelling, and a touch of humor to what he describes as "musical conversations" that delight audiences around the world, including those who do not traditionally attend classical music concerts.',
    websiteUrl: 'https://www.jacobseneric.com/',
  },
  {
    id: 'jeremy-kittel',
    name: 'Jeremy Kittel',
    role: 'Composer',
    image: jeremyImage,
    imageAlt: 'Jeremy Kittel portrait',
    bioText: 'Jeremy Kittel is an American violinist, fiddler, and composer. He received a Grammy nomination for "Best Instrumental Composition" in 2019 alongside John Williams and Terence Blanchard. Fluent in multiple musical genres, he composes original music that draws from a wide variety of influences including folk, jazz, Celtic, Classical, electronic, and more.\n\nKittel performs with his group Kittel & Co., as a soloist with orchestras, and in collaborative and supporting roles with many of today\'s leading artists. In demand as a composer and arranger, he has worked with Abigail Washburn and Bela Fleck, My Morning Jacket, Aoife O\'Donovan, Theo Katzman, Jars of Clay, Yo-Yo Ma, and the Silk Road Ensemble, Jon Batiste, Laura Veirs, Sara Watkins, and the Grammy-winning Turtle Island Quartet (of which he was a member for five years). He has also recorded with artists such as Edgar Meyer, Chris Thile, Fleet Foxes, and Esperanza Spalding.',
    websiteUrl: 'https://jeremykittel.com/',
  },
  {
    id: 'orlando-philharmonic',
    name: 'The Orlando Philharmonic Orchestra',
    image: opoImage,
    imageAlt: 'The Orlando Philharmonic Orchestra',
    bioText: 'Established in 1993, the Orlando Philharmonic Orchestra is led by Music Director Eric Jacobsen and is comprised of creative musicians and artists from around the world. The Philharmonic annually presents the 10-concert Classics Series and Pops Series in Steinmetz Hall as well as its Focus Series and Symphony Storytime Series at The Plaza Live, a historic Central Florida venue. The Orlando Philharmonic Orchestra envisions a thriving Central Florida where live orchestral experiences foster connection, inspire reflection and civic engagement, support music education, and sustain a vibrant creative economy for musicians, and those who make their work possible. More than 170 live concerts are presented each year and impacts more than 70,000 children, youth, and families annually through its Young People\'s Concerts, Symphony Storytime Series, Notes in Your Neighborhood program, and free outdoor community concerts. A resident company of the Dr. Phillips Center for the Performing Arts, the Philharmonic is proud to perform in the new Steinmetz Hall, one of the finest venues for acoustic music in the country. The Orlando Philharmonic is a Partner Organization of the National Alliance for Audition Support, an initiative to increase diversity in American Orchestras.',
    websiteUrl: 'https://orlandophil.org/',
  },
];
