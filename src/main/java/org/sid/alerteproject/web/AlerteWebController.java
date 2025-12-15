package org.sid.alerteproject.web;

import org.sid.alerteproject.entities.User;
import org.sid.alerteproject.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Comparator;
import java.util.stream.Collectors;

@Controller
public class AlerteWebController {

    private final UserRepository userRepository;

    public AlerteWebController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("users", userRepository.findAll());
        return "index";
    }

    @GetMapping("/dashboard/{userId}")
    public String dashboard(@PathVariable Long userId, Model model) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Trier les alertes par ID décroissant (plus récentes d'abord)
        var sortedAlertes = user.getAlertes().stream()
                .sorted(Comparator.comparing(a -> -a.getId()))
                .collect(Collectors.toList());

        model.addAttribute("user", user);
        model.addAttribute("alertes", sortedAlertes);
        model.addAttribute("totalAlertes", user.getAlertes().size());

        return "dashboard";
    }
}