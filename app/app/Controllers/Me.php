<?php namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;
use Firebase\JWT\JWT;
 
class Me extends ResourceController {
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    use ResponseTrait;
    public function index() {
        
      $model = new UserModel();
      $session = session();

      $data = $model->find($session->get('idUser'));

      return $this->respond($data);

    }

    // update
    public function update($id = null){

        $model = new UserModel();
        $session = session();
       
        $data = [
            'FirstName' => $this->request->getVar('firstname'),
            'LastName' => $this->request->getVar('lastname'),
            'Email'  => $this->request->getVar('email'),
            'Password'  => $this->request->getVar('password'),
            'Lastupdated'  => date("Y-m-d H:i:s")
        ];

        $model->update($session->get('idUser'), $data);

        $response = [
          'status'   => 200,
          'error'    => null,
          'messages' => [
              'success' => 'Information updated successfully'
          ]
      ];
      return $this->respond($response);
    }

   

    // delete 
    public function delete($id = null){

        $model = new UserModel();
        $session = session();
        $model->delete($session->get('idUser'));
        $response = [
            'status'   => 200,
            'error'    => null,
            'messages' => [
                'success' => 'User successfully deleted'
            ]
        ];
        return $this->respondDeleted($response);
    }
}
