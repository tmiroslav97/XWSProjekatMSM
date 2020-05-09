import React from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap'

const CarManufacturerComponent = (props) => {

    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }} xs={12}>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Naziv</th>
                                <th>Akcija</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.carManufacturers.map((carManufacturer) => {
                                    return (
                                        <tr key={carManufacturer.id}>
                                            <td>{carManufacturer.name}</td>
                                            <td align="right">
                                                <Button variant="outline-success" onClick={() => { props.setShow(true); props.setSelectedItem(carManufacturer); }}>Izmjeni</Button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default CarManufacturerComponent;
