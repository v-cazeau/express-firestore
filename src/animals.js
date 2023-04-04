import { db } from './dbConnect.js';

export function addNewAnimal(req, res) {
    const newAnimal = req.body //when this function is invoked, that request should come with a body and that body should decribe an animal
    db.collection('animals').add(newAnimal) 
    .then(doc => res.status(201).send("New Animal Added: " + doc.id))
    .catch(err => res.status(500).send(err))
}

export async function getAllAnimals(req,res) {
    const collection = await db.collection('animals').get()
    .catch(err => res.status(500).send(err))
    // const animalList = collection.docs.map(animal => animal.data ) //because animal is a single parameter we could put aminal in () but we don't necessarily need to
    const animalList = collection.docs.map(animal =>({... animal.data(), id:animal.id })) // if we also want to add the id in here do this <- and what that does is pulls it out of the curly braces and then pulls it back in and all of that gymnastics replaces all the information pull the id
    res.send(animalList); 
}