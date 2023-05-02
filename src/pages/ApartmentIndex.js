import React from "react"
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { NavLink } from "react-router-dom"

const ApartmentIndex = ({apartments}) => {
  return (
    <>
      <div className='apartments-body'>
        <h1>Recent Listings</h1>
        <div className='flex-apartments'>
          {apartments?.map((apartment, index) => {
            return(
                <Card key={index} className='apartment-cards'>
                  <CardImg top width="100%" src={apartment.image} alt="" className="apartment-picture"/>
                  <CardBody>
                    <div className="apartment-text">
                      <CardTitle><b>${apartment.price}/month</b></CardTitle>
                      <CardSubtitle>{apartment.street}, {apartment.city}, {apartment.state}</CardSubtitle>
                      <CardSubtitle>{apartment.bedrooms} Bedroom {apartment.bathrooms}, Bath</CardSubtitle>
                    </div>
                    <NavLink to={`/apartmentshow/${apartment.id}`} className="nav-link">
                      <Button className='apartment-button'>More Details</Button>
                    </NavLink>
                  </CardBody>
                </Card>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default ApartmentIndex