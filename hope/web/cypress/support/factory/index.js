import { faker } from '@faker-js/faker'

const images = [
    'kids-playground-1.png',
    'kids-playground-2.png',
    'kids-playground-3.png',
    'kids-playground-4.png',
    'kids-playground-5.png',
    'kids-playground-6.png',
    'kids-playground-7.png',
    'kids-playground-8.png',
    'kids-playground-9.png',
    'kids-playground-10.png',
    'kids-playground-11.png',
    'kids-playground-12.png',
    'kids-playground-13.png',
    'kids-playground-14.png'

]

const generateOrphanage = () => ({
    name: faker.company.name(),
    description: faker.lorem.paragraph(),
    opening_hours: faker.lorem.words(3),
    open_on_weekends: faker.datatype.boolean(),
    position: {
        latitude: Number(faker.location.latitude()),
        longitude: Number(faker.location.longitude()),
    },
    image: images[Math.floor(Math.random() * images.length)],
});

export default generateOrphanage;