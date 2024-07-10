class Movie {
    constructor(

        name,
        director,
        bgImg,
        cast,
        genre,
        rating,
        description,
        runTime,
        releaseDate,
        trailers,
        coverImg,
        ageRes,
        halls,
        sessionTimes,
        cinemas
    ) {

        this.name = name;
        this.director = director;
        this.bgImg = bgImg;
        this.cast = cast;
        this.genre = genre;
        this.rating = rating;
        this.description = description;
        this.runTime = runTime;
        this.releaseDate = releaseDate;
        this.trailers = trailers;
        this.coverImg = coverImg;
        this.ageRes = ageRes;
        this.halls = halls;
        this.sessionTimes = sessionTimes;
        this.cinemas = cinemas;
    }

    // Doğrulama metodu ekleyebilirsiniz (örneğin yup ile)
    async validate() {
        // Doğrulama işlemleri burada yapılabilir
        return { isValid: true }; // Örneğin her zaman geçerli olduğunu varsayalım
    }
}

export default Movie;
