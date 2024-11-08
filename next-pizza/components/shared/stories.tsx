'use client'
import { Api } from '@/services/api-client';
import { IStory } from '@/services/stories';
import React, { useEffect, useState } from 'react';
import { Container } from './container';
import { cn } from '@/lib';
import { X } from 'lucide-react';
import ReactStories from 'react-insta-stories';


interface Props {
  className?: string
}

export const Stories: React.FC<Props> = ({className}) => {
    const [stories, setStories] = useState<IStory[]>([])
    const [open, setOpen] = useState(false) // открытый сторис 
    const [selectedStory, setSelectedStory] = useState<IStory>() // выбранный сторис 

    useEffect(() => {
        async function fetchStories() {
            const data = await Api.stories.getAll()
            setStories(data)
        }

        fetchStories()
    }, [])

    // ОТКРЫВАЕТ СТОРИС; story - Группа содержащая storyItem
    const onClickStory = (story: IStory) => {
        setSelectedStory(story)

        if (story.items.length > 0) { 
            setOpen(true)
        }
    }
    

    return (    
        <Container className={cn('flex items-center justify-center gap-2 my-10', className)}>
            {stories.length === 0 && 
            [...Array(6)].map((_, index) => (
                <div key={index} className="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse" />
            ))}

            {stories.map((story) => (
                <img src={story.previewImageUrl} alt='story'
                 className='rounded-md cursor-pointer'
                 height={250}
                 width={200}
                 onClick={() => onClickStory(story)}/>
            ))}

{open && (
          <div className="absolute left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30">
            <div className="relative" style={{ width: 520 }}>
              <button className="absolute -right-10 -top-5 z-30" onClick={() => setOpen(false)}>
                <X className="absolute top-0 right-0 w-8 h-8 text-white/50" />
              </button>

              <ReactStories
                onAllStoriesEnd={() => setOpen(false)}
                stories={selectedStory?.items.map((item) => ({ url: item.sourceUrl })) || []}
                defaultInterval={3000}
                width={520}
                height={800}
              />
            </div>
          </div>
        )}
        </Container>
  );
};
