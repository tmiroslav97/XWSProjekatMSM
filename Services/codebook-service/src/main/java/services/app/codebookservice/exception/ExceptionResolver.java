package services.app.codebookservice.exception;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionResolver {

    @ExceptionHandler(agent.app.exception.NotFoundException.class)
    public ResponseEntity<?> notFoundException(agent.app.exception.NotFoundException exception) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.TEXT_PLAIN);
        return new ResponseEntity<String>(exception.getMessage(), headers, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(agent.app.exception.ExistsException.class)
    public ResponseEntity<?> existsException(agent.app.exception.ExistsException exception) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.TEXT_PLAIN);
        return new ResponseEntity<String>(exception.getMessage(), headers, HttpStatus.BAD_REQUEST);
    }

}