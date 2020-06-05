package services.app.carrequestservice.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import services.app.carrequestservice.dto.carreq.ListSubmitRequestDTO;
import services.app.carrequestservice.model.CustomPrincipal;
import services.app.carrequestservice.service.intf.RequestService;

@RestController
public class RequestController {

    private final RequestService requestService;

    public RequestController(RequestService requestService) {
        this.requestService = requestService;
    }

    @PreAuthorize("hasAuthority('ROLE_USER')")
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> submitRequest(@RequestBody ListSubmitRequestDTO listSubmitRequestDTO) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        CustomPrincipal cp = (CustomPrincipal) auth.getPrincipal();
        Integer flag = requestService.submitRequest(listSubmitRequestDTO.getSubmitRequestDTOS(), Long.valueOf(cp.getUserId()));
        if (flag == 1) {
            return new ResponseEntity<>("Zahtjev uspjesno kreiran.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Desila se nepoznata greska", HttpStatus.BAD_REQUEST);
        }
    }
}