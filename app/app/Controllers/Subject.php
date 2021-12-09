<?php namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\SubjectModel;


class Subject extends ResourceController {
    use ResponseTrait;

        
    // all Subjects
    public function index(){
        
      $model = new SubjectModel();

      $data['Subject'] = $model->orderBy('idSubject', 'DESC')->findAll();

      return $this->respond($data);
    }

    // single Subject
    public function show($id = null){

        $model = new SubjectModel();

        $data = $model->find($id);
        if($data){
            return $this->respond($data);
        }else{
            return $this->failNotFound('No Subject found');
        }
    }

    // create
    public function create() {

        $model = new SubjectModel();
        $session = session();

        $data = [
            'ShortName'  => $this->request->getVar('shortname'),
            'Name' => $this->request->getVar('name'),
            'Creator_idUser' => $session->get('idUser'), //NEED to come from session ID!!!!
            'Active'  => 1,
            'CreateDate'  => date("Y-m-d H:i:s")
        ];

        $model->insert($data);

        $response = [
          'status'   => 201,
          'error'    => null,
          'messages' => [
              'success' => 'Subject created successfully'
          ]
      ];
      
      return $this->respondCreated($response);

    }




    // update
    public function update($id = null){

        $model = new SubjectModel();

        $data = [
            'ShortName'  => $this->request->getVar('shortname'),
            'Name' => $this->request->getVar('name'),
            //'Creator_idUser' => 1, //NEED to come from session ID!!!!
            'Active'  => 1
        ];

        $model->update($id, $data);

        $response = [
          'status'   => 200,
          'error'    => null,
          'messages' => [
              'success' => 'Subject updated successfully'
          ]
      ];
      return $this->respond($response);
    }

   

    // delete 
    public function delete($id = null){

        $model = new SubjectModel();

        $data = $model->find($id);
        if($data){
            $model->delete($id);
            $response = [
                'status'   => 200,
                'error'    => null,
                'messages' => [
                    'success' => 'Subject successfully deleted'
                ]
            ];
            return $this->respondDeleted($response);
        }else{
            return $this->failNotFound('No Subject found');
        }
    }

}