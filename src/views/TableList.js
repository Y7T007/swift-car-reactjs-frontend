/*!

=========================================================
* Now UI Dashboard React - v1.5.2
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import { thead, tbody } from "variables/general";

function RegularTables() {
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Simple Table</CardTitle>
                <div className="intro-section dark:bg-gray-800 dark:text-white">
                  <h2>Welcome to Your Managers Management Dashboard</h2>
                  <p>Click on the "New Manager" button to add a new client to your list.</p>
                  <button className="add-client-btn" onClick={() => setShowAddModal(true)}>New Manager</button>
                </div>

              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Date of Birth</th>
                    <th>Gender</th>
                    <th>Contact Number</th>
                    <th>Address</th>
                    <th>Agency ID</th>
                    <th>Salary</th>
                    <th>CIN</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  {filteredManagers.map((manager) => (
                      <tr key={manager._id}>
                        <td>{manager._id}</td>
                        <td>{manager.name}</td>
                        <td>{manager.date_of_birth}</td>
                        <td>{manager.gender}</td>
                        <td>{manager.contact_number}</td>
                        <td>{manager.address}</td>
                        <td>{manager.agence_id}</td>
                        <td>{manager.salary}</td>
                        <td>{manager.cin}</td>
                        <td>{manager.email}</td>
                        <td>
                          <ul className="action-list">
                            <li><button className="fa fa-edit" data-tip="edit" onClick={() => { setCurrentManager(manager); setShowUpdateModal(true); }}></button></li>
                            <li><button data-tip="delete" onClick={() => handleDeleteManager(manager._id)}><i className="fa fa-trash"></i></button></li>
                          </ul>
                        </td>
                      </tr>
                  ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col xs={12}>
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4">Table on Plain Background</CardTitle>
                <p className="category"> Here is a subtitle for this table</p>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      {thead.map((prop, key) => {
                        if (key === thead.length - 1)
                          return (
                            <th key={key} className="text-right">
                              {prop}
                            </th>
                          );
                        return <th key={key}>{prop}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {tbody.map((prop, key) => {
                      return (
                        <tr key={key}>
                          {prop.data.map((prop, key) => {
                            if (key === thead.length - 1)
                              return (
                                <td key={key} className="text-right">
                                  {prop}
                                </td>
                              );
                            return <td key={key}>{prop}</td>;
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default RegularTables;
