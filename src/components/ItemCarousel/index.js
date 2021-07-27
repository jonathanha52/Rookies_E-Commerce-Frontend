import React from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
  } from 'reactstrap';

export default class ItemCarousel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            activeIndex: 0,
            animating: false,
            items:[
                {
                  src:"https://i.imgur.com/t8jAyWZ.jpg",
                  altText: 'Slide 1',
                  caption: 'In the comfort of your home',
                  header: 'Get everything'
                },
                {
                  src:"https://i.imgur.com/aIjz4qC.jpg",
                  altText: 'Slide 2',
                  caption: 'Focus on your passion',
                  header: 'Time is precious'
                },
                {
                  src:"https://i.imgur.com/DqKAJYM.jpg",
                  altText: 'Slide 3',
                  caption: 'Invest in your future',
                  header: 'Save money'
                }
              ]
        }
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
    }
    next(){
        if(this.state.animating) return;
        const nextIndex = this.state.activeIndex === this.state.items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({activeIndex: nextIndex});
    }
    prev(){
        if(this.state.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.state.items.length - 1 : this.state.activeIndex - 1;
        this.setState({activeIndex: nextIndex});
    }
    goToIndex(newIndex){
        if(this.state.animating) return;
        this.setState({activeIndex: newIndex})
    }

    render(){
        var slides = this.state.items.map((item) => {
            return (
              <CarouselItem
                onExiting={() => this.setState({animating: true})}
                onExited={() => this.setState({animating: false})}
                key={item.src}
              >
                <img src={item.src} alt={item.altText} />
                <CarouselCaption captionText={item.caption} captionHeader={item.header} />
              </CarouselItem>
            );
          });
        return <Carousel
                activeIndex={this.state.activeIndex}
                next={this.next}
                previous={this.prev}
            >
                <CarouselIndicators items={this.state.items} activeIndex={this.state.activeIndex} onClickHandler={this.goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.prev} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
            </Carousel>;
    }
}