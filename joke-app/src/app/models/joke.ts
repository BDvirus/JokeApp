export enum JokeType {
  twopart = 'twopart',
  onepart = 'single',
}

interface JokeFlag {
  nsfw: boolean;
  religious: boolean;
  political: boolean;
  racist: boolean;
  sexist: boolean;
}

export interface Joke {
  id: any;
  category: string;
  type: JokeType;
  joke?: string;
  delivery?: string;
  setup?: string;
  flags?: JokeFlag;
}
