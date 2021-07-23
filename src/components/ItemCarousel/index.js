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
                  src:"http://via.placeholder.com/1024x500.svg/918d8d",
                  altText: 'Slide 1',
                  caption: 'Slide 1'
                },
                {
                  src:"http://via.placeholder.com/1024x500.svg/b5b1b1",
                  altText: 'Slide 2',
                  caption: 'Slide 2'
                },
                {
                  src:"http://via.placeholder.com/1024x500.svg/d3dbd5",
                  altText: 'Slide 3',
                  caption: 'Slide 3'
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
                <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
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