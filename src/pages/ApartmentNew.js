import React, { useState } from "react"
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom"

const ApartmentNew = ({createApartment, current_user}) => {
  const navigate = useNavigate()
  const [myApartment, setMyApartment] = useState({
    street: "",
    city: "",
    state: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    pets: "",
    image: "",
    manager: "",
    email: "",
    user_id: current_user.id
  })

  const handleChange = (e) => {
    setMyApartment({ ...myApartment, [e.target.name]: e.target.value})
  }

  const handleSubmit = () => {
    createApartment(myApartment)
    navigate("/myapartments")
  }

  return (
    <>
    {current_user?.id && (
        <div className="new-body">
          <h1>New Listing</h1>
            <Form className="form">
              <FormGroup className="form-group street">
                  <Label for="street">Street: </Label>
                  <Input type="text" name="street" onChange={handleChange} value={myApartment.street} />
                </FormGroup>
                <FormGroup className="form-group group city">
                  <Label for="city">City: </Label>
                  <Input type="text" name="city" onChange={handleChange} value={myApartment.city} />
                </FormGroup>
                <FormGroup className="form-group state">
                  <Label for="state">State: </Label>
                  <Input type="text" name="state" onChange={handleChange} value={myApartment.state} />
                </FormGroup>
                <FormGroup className="form-group price">
                  <Label for="price">Price per month: </Label>
                  <Input type="text" name="price" onChange={handleChange} value={myApartment.price} />
                </FormGroup>
                <FormGroup className="form-group bedrooms">
                  <Label for="bedrooms">Bedrooms: </Label>
                  <Input type="number" name="bedrooms" onChange={handleChange} value={myApartment.bedrooms} />
                </FormGroup>
                <FormGroup className="form-group bathrooms">
                  <Label for="bathrooms">Bathrooms: </Label>
                  <Input type="number" name="bathrooms" onChange={handleChange} value={myApartment.bathrooms} />
                </FormGroup>
                <FormGroup className="form-group pets">
                  <Label for="petss">Pets: </Label>
                  <Input type="text" name="pets" onChange={handleChange} value={myApartment.pets} />
                </FormGroup>
                <FormGroup className="form-group image">
                  <Label for="image">Image URL: </Label>
                  <Input type="text" name="image" onChange={handleChange} value={myApartment.image} />
                </FormGroup>
                <FormGroup className="form-group manager">
                  <Label for="manager">Manager: </Label>
                  <Input type="text" name="manager" onChange={handleChange} value={myApartment.manager} />
                </FormGroup>
                <FormGroup className="form-group email">
                  <Label for="email">Email: </Label>
                  <Input type="email" name="email" onChange={handleChange} value={myApartment.email} />
                </FormGroup>
                <div className="submit">
                  <Button onClick={handleSubmit} className="new-button">Submit</Button>
                </div>
            </Form>
        </div>
     )}
    </>
  )
}

export default ApartmentNew