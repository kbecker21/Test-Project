<?php namespace App\Controllers;
 
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;
 
class Register extends ResourceController {

    use ResponseTrait;

    public function index() {
       /* helper(['form']);
        $rules = [
            'email' => 'required|valid_email|is_unique[users.email]',
            'password' => 'required|min_length[6]',
            'confpassword' => 'matches[password]'
        ];
        if(!$this->validate($rules)) return $this->fail($this->validator->getErrors()); */

        $data = [
            'FirstName' => $this->request->getVar('firstname'),
            'LastName' => $this->request->getVar('lastname'),
            'Email'  => $this->request->getVar('email'),
            'Password'  => $this->request->getVar('password'),
            'CreateDate'  => date("Y-m-d H:i:s"),
            'Status'  => 0,
            'AccountLevel_idAccountLevel'  => 3
        ];

        $model = new UserModel();
        $registered = $model->insert($data);
        $this->respondCreated($registered);
 
    }
 
}