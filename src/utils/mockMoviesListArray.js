const movies = [
    {
        _id: 1,
        owner: 1,
        nameRU: '38-я параллель',
        nameEN: 'Tae Guk Gi: The Brotherhood of War',
        country: 'Корея',
        director: 'Кан Джегю',
        duration: 150,
        year: 2004,
        description: 'Эпический военный фильм режиссёра Кан Джегю, рассказывающий об истории двух братьев во время Корейской войны.',
        image: 'https://m.media-amazon.com/images/M/MV5BMTc1MDYxMjk1Ml5BMl5BanBnXkFtZTcwMjE4MzcyMQ@@._V1_.jpg',
        trailerLink: 'https://www.youtube.com/watch?v=nm2aZz45pGE&ab_channel=BlazingTrailers',
        thumbnail: 'https://m.media-amazon.com/images/M/MV5BMTc1MDYxMjk1Ml5BMl5BanBnXkFtZTcwMjE4MzcyMQ@@._V1_.jpg',

    },
    {
        _id: 2,
        owner: 1,
        nameRU: 'Властелин колец: Возвращение короля',
        nameEN: 'The Lord of the Rings: The Return of the King',
        country: 'США, Новая Зеландия',
        director: 'Питер Джексон',
        duration: 201,
        year: 2003,
        description: 'Завершающая часть трилогии по мотивам романа Дж. Р. Р. Толкина. Битва за Средиземье достигает своего разгара, и Фродо вместе с верными друзьями должен уничтожить Кольцо Всевластья.',
        image: 'https://images.moviesanywhere.com/45bc0ec075bfc0b4d8f184a7cc5bf993/876ed805-83b1-4387-b0d0-62d08c36536d.jpg',
        trailerLink: 'https://www.youtube.com/watch?v=r5X-hFf6Bwo&ab_channel=Movieclips',
        thumbnail: 'https://images.moviesanywhere.com/45bc0ec075bfc0b4d8f184a7cc5bf993/876ed805-83b1-4387-b0d0-62d08c36536d.jpg',
    },
    {
        _id: 3,
        owner: 1,
        nameRU: 'The Godfather',
        nameEN: 'The Godfather',
        country: 'USA',
        director: 'Francis Ford Coppola',
        duration: 175,
        year: 1972,
        description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
        image: 'https://imgix.hoyts.com.au/mx/posters/au/the-godfather---50th-anniversary-6dbb98ed.jpg',
        trailerLink: 'https://www.youtube.com/watch?v=sY1S34973zA&ab_channel=MovieclipsClassicTrailers',
        thumbnail: 'https://imgix.hoyts.com.au/mx/posters/au/the-godfather---50th-anniversary-6dbb98ed.jpg',
    },
    {
        _id: 4,
        owner: 1,
        nameRU: 'The Dark Knight',
        nameEN: 'The Dark Knight',
        country: 'USA, UK',
        director: 'Christopher Nolan',
        duration: 152,
        year: 2008,
        description: 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
        image: 'https://musicart.xboxlive.com/7/abb02f00-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080',
        trailerLink: 'https://www.youtube.com/watch?v=EXeTwQWrcwY&ab_channel=WarnerBros.Pictures',
        thumbnail: 'https://musicart.xboxlive.com/7/abb02f00-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080',
    },
    {
        _id: 5,
        owner: 1,
        nameRU: 'Pulp Fiction',
        nameEN: 'Pulp Fiction',
        country: 'USA',
        director: 'Quentin Tarantino',
        duration: 154,
        year: 1994,
        description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
        image: 'https://www.miramax.com/assets/Pulp-Fiction1.png',
        trailerLink: 'https://www.youtube.com/watch?v=s7EdQ4FqbhY&ab_channel=MovieclipsClassicTrailers',
        thumbnail: 'https://www.miramax.com/assets/Pulp-Fiction1.png',
    },
    {
        _id: 6,
        owner: 1,
        nameRU: 'Forrest Gump',
        nameEN: 'Forrest Gump',
        country: 'USA',
        director: 'Robert Zemeckis',
        duration: 142,
        year: 1994,
        description: 'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold through the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.',
        image: 'https://c4.wallpaperflare.com/wallpaper/539/710/449/movies-forrest-gump-wallpaper-preview.jpg',
        trailerLink: 'https://www.youtube.com/watch?v=bLvqoHBptjg&ab_channel=ParamountMovies',
        thumbnail: 'https://c4.wallpaperflare.com/wallpaper/539/710/449/movies-forrest-gump-wallpaper-preview.jpg',
    },
    {
        _id: 7,
        owner: 1,
        nameRU: 'The Matrix',
        nameEN: 'The Matrix',
        country: 'USA',
        director: 'Lana Wachowski, Lilly Wachowski',
        duration: 136,
        year: 1999,
        description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
        image: 'https://m.media-amazon.com/images/I/51EG732BV3L._AC_.jpg',
        trailerLink: 'https://www.youtube.com/watch?v=m8e-FF8MsqU&ab_channel=MovieclipsClassicTrailers',
        thumbnail: 'https://m.media-amazon.com/images/I/51EG732BV3L._AC_.jpg',
    },
    {
        _id: 8,
        owner: 1,
        nameRU: 'Gladiator',
        nameEN: 'Gladiator',
        country: 'USA, UK',
        director: 'Ridley Scott',
        duration: 155,
        year: 2000,
        description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
        image: 'https://phantom-marca.unidadeditorial.es/652265447f82f08b205e14cc149bcb34/resize/828/f/webp/assets/multimedia/imagenes/2021/09/30/16330136842901.jpg',
        trailerLink: 'https://www.youtube.com/watch?v=Q-b7B8tOAQU&ab_channel=MovieclipsClassicTrailers',
        thumbnail: 'https://phantom-marca.unidadeditorial.es/652265447f82f08b205e14cc149bcb34/resize/828/f/webp/assets/multimedia/imagenes/2021/09/30/16330136842901.jpg',
    },
    {
        _id: 9,
        owner: 1,
        nameRU: 'Gladiator',
        nameEN: 'Gladiator',
        country: 'USA, UK',
        director: 'Ridley Scott',
        duration: 155,
        year: 2000,
        description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
        image: 'https://phantom-marca.unidadeditorial.es/652265447f82f08b205e14cc149bcb34/resize/828/f/webp/assets/multimedia/imagenes/2021/09/30/16330136842901.jpg',
        trailerLink: 'https://www.youtube.com/watch?v=Q-b7B8tOAQU&ab_channel=MovieclipsClassicTrailers',
        thumbnail: 'https://phantom-marca.unidadeditorial.es/652265447f82f08b205e14cc149bcb34/resize/828/f/webp/assets/multimedia/imagenes/2021/09/30/16330136842901.jpg',
    },
    {
        _id: 10,
        owner: 1,
        nameRU: 'Gladiator',
        nameEN: 'Gladiator',
        country: 'USA, UK',
        director: 'Ridley Scott',
        duration: 155,
        year: 2000,
        description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
        image: 'https://phantom-marca.unidadeditorial.es/652265447f82f08b205e14cc149bcb34/resize/828/f/webp/assets/multimedia/imagenes/2021/09/30/16330136842901.jpg',
        trailerLink: 'https://www.youtube.com/watch?v=Q-b7B8tOAQU&ab_channel=MovieclipsClassicTrailers',
        thumbnail: 'https://phantom-marca.unidadeditorial.es/652265447f82f08b205e14cc149bcb34/resize/828/f/webp/assets/multimedia/imagenes/2021/09/30/16330136842901.jpg',
    },
    {
        _id: 11,
        owner: 1,
        nameRU: 'Gladiator',
        nameEN: 'Gladiator',
        country: 'USA, UK',
        director: 'Ridley Scott',
        duration: 155,
        year: 2000,
        description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
        image: 'https://phantom-marca.unidadeditorial.es/652265447f82f08b205e14cc149bcb34/resize/828/f/webp/assets/multimedia/imagenes/2021/09/30/16330136842901.jpg',
        trailerLink: 'https://www.youtube.com/watch?v=Q-b7B8tOAQU&ab_channel=MovieclipsClassicTrailers',
        thumbnail: 'https://phantom-marca.unidadeditorial.es/652265447f82f08b205e14cc149bcb34/resize/828/f/webp/assets/multimedia/imagenes/2021/09/30/16330136842901.jpg',
    },
    {
        _id: 12,
        owner: 1,
        nameRU: 'Gladiator',
        nameEN: 'Gladiator',
        country: 'USA, UK',
        director: 'Ridley Scott',
        duration: 155,
        year: 2000,
        description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
        image: 'https://phantom-marca.unidadeditorial.es/652265447f82f08b205e14cc149bcb34/resize/828/f/webp/assets/multimedia/imagenes/2021/09/30/16330136842901.jpg',
        trailerLink: 'https://www.youtube.com/watch?v=Q-b7B8tOAQU&ab_channel=MovieclipsClassicTrailers',
        thumbnail: 'https://phantom-marca.unidadeditorial.es/652265447f82f08b205e14cc149bcb34/resize/828/f/webp/assets/multimedia/imagenes/2021/09/30/16330136842901.jpg',
    },
];

export default movies;