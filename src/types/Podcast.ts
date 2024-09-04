export type TPodcast = {
  id: string;
  img: string;
  author: string;
  title: string;
  description: string;
};

export type TPodcastApiResponse = {
  feed: {
    entry: {
      id: { attributes: { 'im:id': string } };
      'im:image': { label: string }[];
      'im:artist': { label: string };
      'im:name': { label: string };
      summary: { label: string };
    }[];
  };
};

export interface IPodcastCardProps {
  podcast: TPodcast;
}
