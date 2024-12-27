'use client';

import { useEffect, useState } from 'react';
import ReactStories from 'react-insta-stories';
import { X } from 'lucide-react';

import { cn } from '@/shared/lib/tailwind-merge';

import { type IStoryWithItems, useStories } from '@/entities/stories';

import { Container } from '@/shared/ui/container';
import { Skeleton } from '@/shared/ui/skeleton';

interface Props {
  className?: string;
}

export const Stories = ({ className }: Props) => {
  const [windowWidth, setWindowWidth] = useState<number>(1920);

  useEffect(() => {
    if (typeof window !== 'undefined') setWindowWidth(window.innerWidth);
  }, []);

  const [open, setOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<IStoryWithItems>();

  const { data: stories, isLoading } = useStories();

  const onClickStory = (story: IStoryWithItems) => {
    setSelectedStory(story);

    if (story.items.length > 0) setOpen(true);
  };

  return (
    <>
      <Container
        classname={cn('my-6 flex items-center gap-8 overflow-auto no-scrollbar', className)}>
        {isLoading &&
          [...Array(6)].map((_, i) => (
            <Skeleton key={i} className="min-w-[82px] min-h-[82px] rounded-full" />
          ))}

        {stories?.map((story) => (
          <div
            className="rounded-full border-2 border-primary p-1 cursor-pointer min-w-[82px] min-h-[82px]"
            key={story.id}>
            <img
              onClick={() => onClickStory(story)}
              className="object-cover rounded-full aspect-square"
              height={70}
              width={70}
              alt="story"
              src={story.previewImageUrl}
            />
          </div>
        ))}

        {open && (
          <div className="fixed overflow-hidden left-0 top-0 right-0 bottom-0 w-full h-full bg-black/80 flex items-center justify-center z-50">
            <div className="absolute">
              <button
                className="absolute -right-10 -top-5 phone:right-2 phone:top-5 z-30"
                onClick={() => setOpen(false)}>
                <X className="absolute top-0 right-0 w-8 h-8 text-white/50" />
              </button>

              <ReactStories
                storyContainerStyles={{ borderRadius: '5px' }}
                storyInnerContainerStyles={{ borderRadius: '5px' }}
                onAllStoriesEnd={() => setOpen(false)}
                stories={selectedStory?.items.map((item) => ({ url: item.sourceUrl })) || []}
                defaultInterval={10000}
                height={windowWidth < 480 ? '100vh' : 800}
                width={windowWidth < 480 ? '100vw' : 520}
              />
            </div>
            <div
              className="absolute h-full w-full top-0 left-0 cursor-pointer"
              onClick={() => setOpen(false)}></div>
          </div>
        )}
      </Container>
    </>
  );
};
