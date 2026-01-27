import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const allDrips = await getCollection('drips');
  
  // Get today's date at midnight for comparison
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  
  // Filter to only include editions with publishDate <= today
  const publishedDrips = allDrips.filter((drip) => {
    const dateStr = drip.id.replace('/index', '');
    const [year, month, day] = dateStr.split('-').map(Number);
    const dripDate = new Date(year, month - 1, day);
    return dripDate <= today;
  });
  
  // Sort by id (date) in descending order
  const sortedDrips = publishedDrips.sort((a, b) => {
    return b.id.localeCompare(a.id);
  });

  return rss({
    title: '.NET drip Newsletter',
    description: 'Curated C# and .NET content delivered three days a week. Stay current with the latest news, tutorials, and community resources.',
    site: context.site,
    items: sortedDrips.map((drip) => {
      const dateStr = drip.id.replace('/index', '');
      const [year, month, day] = dateStr.split('-').map(Number);
      const pubDate = new Date(year, month - 1, day);
      
      // Create a formatted description with all links
      const description = drip.data.links.map(link => 
        `<h3><a href="${link.url}">${link.title}</a></h3><p>${link.summary}</p>`
      ).join('\n');

      // Remove trailing slash from site URL to avoid double slashes
      const baseUrl = context.site.toString().replace(/\/$/, '');

      return {
        title: `.NET drip - ${pubDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,
        pubDate: pubDate,
        description: description,
        link: `${baseUrl}/drip/${dateStr}`,
      };
    }),
    customData: `<language>en-us</language>`,
  });
}
