import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn,MDBCard,MDBBadge,MDBCardBody,MDBInput,MDBFormInline } from 'mdbreact';

const Signup = () => {
return (
<MDBContainer>
      <MDBRow>
        <MDBCol md="6">
        <MDBCard>
        <MDBCardBody>
          <form method="post" onSubmit={this.onSubmit} action="http://localhost:4000/register">
            <p className="h5 text-center mb-4">Sign up</p>
            <div className="grey-text">
              <MDBInput

                label="Name"
                icon="user"
                type="text"
                group
                error="wrong"
                success="right"
                name="name"
                pattern="[A-Za-z]{3,}"
                title="Name cannot contain numbers and minimum of 3 characters"
                value={this.state.name}
                onChange={this.onChangeName}
                required


              />
              <MDBInput
                label="Email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
                name="email"
                title="Please enter a valid email address"
                value={this.state.email}
                onChange={this.onChangeEmail}
                required
              />
              <MDBInput
                label="Phone Number"
                icon="phone-volume"
                group
                validate
                error="wrong"
                success="right"
                name="phone"
                type="tel"
                pattern="[0-9]{10}"
                title="Please enter a valid Phone Number of 10 digits"
                value={this.state.phone}
                onChange={this.onChangeNumber}
                required
              />


              <MDBInput
                label="Password"
                icon="lock"
                group
                type="password"
                validate
                error="wrong"
                success="right"
                name="password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                required
                value={this.state.password}
                onChange={this.onChangePassword}

              />

              <h5><MDBBadge color="secondary">Gender</MDBBadge></h5>
              <MDBFormInline>
        <MDBInput
          onClick={this.onClick('M')}
          checked={this.state.radio === 1 ? true : false}
          label='Male'
          type='radio'
          id='radio1'
          containerClass='mr-5'
        />
        <MDBInput
          onClick={this.onClick('F')}
          checked={this.state.radio === 2 ? true : false}
          label='Female'
          type='radio'
          id='radio2'
          containerClass='mr-5'
        />
        <MDBInput
          onClick={this.onClick('O')}
          checked={this.state.radio === 3 ? true : false}
          label='Other'
          type='radio'
          id='radio3'
          containerClass='mr-5'
        />
      </MDBFormInline>


            </div>
            <div className="text-center">
              <MDBBtn gradient="purple" type="submit">Sign Up</MDBBtn>
              
            </div>
          </form>
          </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
);
};

export default Signup;