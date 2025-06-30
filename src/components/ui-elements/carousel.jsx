import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Button } from "react-bootstrap";

// Create carousel context to share state
const CarouselContext = createContext();

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

function Carousel({ children, className = "", ...props }) {
  const carouselRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    setCanScrollPrev(el.scrollLeft > 0);
    setCanScrollNext(el.scrollLeft + el.offsetWidth < el.scrollWidth);
  }, []);

  const scrollPrev = () => {
    carouselRef.current?.scrollBy({ left: -carouselRef.current.offsetWidth, behavior: "smooth" });
  };

  const scrollNext = () => {
    carouselRef.current?.scrollBy({ left: carouselRef.current.offsetWidth, behavior: "smooth" });
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollNext();
    }
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    updateScroll();
    el.addEventListener("scroll", updateScroll);
    window.addEventListener("resize", updateScroll);
    return () => {
      el.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, [updateScroll]);

  return (
    <CarouselContext.Provider
      value={{ carouselRef, scrollPrev, scrollNext, canScrollPrev, canScrollNext }}
    >
      <div
        role="region"
        aria-roledescription="carousel"
        onKeyDown={handleKeyDown}
        className={`position-relative ${className}`}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({ children }) {
  const { carouselRef } = useCarousel();
  return (
    <div
      ref={carouselRef}
      className="d-flex overflow-auto"
      style={{
        scrollSnapType: "x mandatory",
        scrollBehavior: "smooth",
        gap: "1rem",
        paddingBottom: "1rem",
      }}
    >
      {children}
    </div>
  );
}

function CarouselItem({ children, className = "", ...props }) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={`flex-shrink-0 w-100 ${className}`}
      style={{
        scrollSnapAlign: "start",
        minWidth: "100%",
      }}
      {...props}
    >
      {children}
    </div>
  );
}

function CarouselPrevious({ className = "", ...props }) {
  const { scrollPrev, canScrollPrev } = useCarousel();
  return (
    <Button
      variant="outline-secondary"
      size="sm"
      onClick={scrollPrev}
      disabled={!canScrollPrev}
      className={`position-absolute top-50 start-0 translate-middle-y rounded-circle ${className}`}
      style={{ width: "2rem", height: "2rem", zIndex: 10 }}
      aria-label="Previous slide"
      {...props}
    >
      {"‹"}
    </Button>
  );
}

function CarouselNext({ className = "", ...props }) {
  const { scrollNext, canScrollNext } = useCarousel();
  return (
    <Button
      variant="outline-secondary"
      size="sm"
      onClick={scrollNext}
      disabled={!canScrollNext}
      className={`position-absolute top-50 end-0 translate-middle-y rounded-circle ${className}`}
      style={{ width: "2rem", height: "2rem", zIndex: 10 }}
      aria-label="Next slide"
      {...props}
    >
      {"›"}
    </Button>
  );
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  useCarousel,
};
