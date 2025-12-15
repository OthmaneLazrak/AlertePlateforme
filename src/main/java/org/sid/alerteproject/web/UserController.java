/*package org.sid.alerteproject.web;

import org.sid.alerteproject.dto.AlerteRequest;
import org.sid.alerteproject.dto.UserRequestDTO;
import org.sid.alerteproject.dto.UserResponseDTO;
import org.sid.alerteproject.entities.Alerte;
import org.sid.alerteproject.entities.User;
import org.sid.alerteproject.repositories.UserRepository;
import org.sid.alerteproject.services.UserServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/user")
public class UserController {


    private UserServiceImpl adminService;

    private UserRepository userRepository;

    public UserController(UserServiceImpl adminService, UserRepository userRepository) {
        this.adminService = adminService;
        this.userRepository = userRepository;
    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/get/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PostMapping("/add")
    public User AddUser(@RequestBody User user) {
        return adminService.AjouterUtilisateur(user);
    }

    @PostMapping("/addUser")
    public UserResponseDTO save(@RequestBody UserRequestDTO user){
        return adminService.addUser(user);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable Long id){
        userRepository.deleteById(id);
    }

    @PutMapping("/update/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user){
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (user.getNom() != null) existingUser.setNom(user.getNom());
        if (user.getPrenom() != null) existingUser.setPrenom(user.getPrenom());
        if (user.getStatus() != null) existingUser.setStatus(user.getStatus());
        return userRepository.save(existingUser);
    }

    @GetMapping("/alertes")
    public List<Alerte> getAllAlertes(){
        return adminService.AfficherAlertes();
    }


    @GetMapping("/alertes/{userId}")
    public void getAlertesByUser(@PathVariable Long userId){
        User user =userRepository.findById(userId)
                .orElseThrow(()->new RuntimeException("User not found"));
        List<Alerte> alertes = user.getAlertes();
        alertes.forEach(alerte -> {
            System.out.println(alerte.getMessage());
        });


    }

    @PostMapping("/{userId}/alertes/send")
    public ResponseEntity<Alerte> RecevoirAlerte(@PathVariable Long userId,@RequestBody AlerteRequest alerteId){

        Alerte alerte=adminService.ReceiveAlerte(userId,alerteId);
        return ResponseEntity.status(HttpStatus.CREATED).body(alerte);
    }
}*/
