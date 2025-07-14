//package com.email.email_writer_sb.app;
//import lombok.AllArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//@RestController
//@RequestMapping("/api/email")
//@AllArgsConstructor
//@CrossOrigin(origins ="*")
//public class EmailGeneratorController {
//    private final EmailGeneratorService emailGeneratorService;
//    @PostMapping("/generate")
//    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest) {
//        String response = emailGeneratorService.generateEmailReply(emailRequest);
//        return ResponseEntity.ok(response);
//    }
//}
package com.email.email_writer_sb.app;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
@RestController
@RequestMapping("/api/email")
@AllArgsConstructor
@CrossOrigin(origins ="*")
public class EmailGeneratorController {
    private final EmailGeneratorService emailGeneratorService;

    @PostMapping("/generate")
    public Mono<ResponseEntity<String>> generateEmail(@RequestBody EmailRequest emailRequest) {
        return emailGeneratorService.generateEmailReply(emailRequest)
                .map(ResponseEntity::ok); // Wrap the result in a ResponseEntity
    }

//    @PostMapping("/generate-auto")
//    public Mono<ResponseEntity<String>> generateAuto(@RequestBody EmailRequest request) {
//        return emailGeneratorService.generateAutoToneEmail(request.getPrompt())
//                .map(ResponseEntity::ok);
//    }
}

