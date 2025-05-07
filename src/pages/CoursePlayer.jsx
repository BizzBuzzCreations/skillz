const CoursePlayer = () => {
  return (
    <>

      <section className="flex-1 px-10 py-5">
        <iframe
          className="w-full  rounded-lg"
          width="560"
          height="560"
          src="https://www.youtube.com/embed/RqTEHSBrYFw?si=yCq-jEFZn15mvdcc"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen>
        </iframe>
      </section>

    </>
  )
}

export default CoursePlayer;