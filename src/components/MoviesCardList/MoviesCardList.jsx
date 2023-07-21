import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
function MoviesCardList() {
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
        }];

    return (
        <section className="movies__container">
            <div className="movies__list">
                {movies.map((movie) => (
                    <MoviesCard
                        movie={movie}
                        key={movie._id} />
                ))}
            </div>
        </section>

    )
}

export default MoviesCardList;