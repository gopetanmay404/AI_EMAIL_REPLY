//package com.email.email_writer_sb.app;
//import com.fasterxml.jackson.databind.JsonNode;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//import org.springframework.web.reactive.function.client.WebClient;
//import java.util.Map;
//@Service
//public class EmailGeneratorService {
//    private final WebClient webClient;
//
//    @Value("${gemini.api.url}")
//    private String geminiApiUrl;
//
//    @Value("${gemini.api.key}")
//    private String geminiApiKey;
//
//    public EmailGeneratorService(WebClient.Builder webClientBuilder) {
//        this.webClient = webClientBuilder.build();
//    }
//    public String generateEmailReply(EmailRequest emailRequest) {
//        // Build the prompt
//        String prompt = buildPrompt(emailRequest);
//
//        // Craft a request
//        Map<String, Object> requestBody = Map.of(
//                "contents", new Object[] {
//                        Map.of("parts", new Object[]{
//                                Map.of("text", prompt)
//                        })
//                }
//        );
//        // Do request and get response
//        String response = webClient.post()
//                .uri(geminiApiUrl + geminiApiKey)
//                .header("Content-Type","application/json")
//                .bodyValue(requestBody)
//                .retrieve()
//                .bodyToMono(String.class)
//                .block();
//
//        // Extract Response and Return
//        return extractResponseContent(response);
//    }
//
//    private String extractResponseContent(String response) {
//        try {
//            ObjectMapper mapper = new ObjectMapper();
//            JsonNode rootNode = mapper.readTree(response);
//            return rootNode.path("candidates")
//                    .get(0)
//                    .path("content")
//                    .path("parts")
//                    .get(0)
//                    .path("text")
//                    .asText();
//        } catch (Exception e) {
//            return "Error processing request: " + e.getMessage();
//        }
//    }
//    private String buildPrompt(EmailRequest emailRequest) {
//        StringBuilder prompt = new StringBuilder();
//        prompt.append("Generate a professional email reply for the following email content. Please don't generate a subject line ");
//        if (emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()) {
//            prompt.append("Use a ").append(emailRequest.getTone()).append(" tone.");
//        }
//        prompt.append("\nOriginal email: \n").append(emailRequest.getEmailContent());
//        return prompt.toString();
//    }
//}
package com.email.email_writer_sb.app;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import java.util.List;
import java.util.Map;
@Service
public class EmailGeneratorService {
    private final WebClient webClient;
    @Value("${gemini.api.url}")
    private String geminiApiUrl;
    @Value("${gemini.api.key}")
    private String geminiApiKey;

    public EmailGeneratorService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public Mono<String> generateEmailReply(EmailRequest emailRequest) {
        String prompt = buildPrompt(emailRequest);
        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(
                                Map.of("text", prompt)
                        ))
                )
        );
        return webClient.post()
                .uri(geminiApiUrl + "?key=" + geminiApiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .map(this::extractResponseContent)
                .onErrorResume(e -> Mono.just("Internal error occurred: " + e.getMessage()));
    }

    private String extractResponseContent(String response) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(response);
            return rootNode.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();
        } catch (Exception e) {
            return "Error processing response: " + e.getMessage();
        }
    }


//    private Mono<String> callGemini(String prompt) {
//        Map<String, Object> requestBody = Map.of(
//                "contents", List.of(
//                        Map.of("parts", List.of(
//                                Map.of("text", prompt)
//                        ))
//                )
//        );
//
//        return webClient.post()
//                .uri(geminiApiUrl + "?key=" + geminiApiKey)
//                .header("Content-Type", "application/json")
//                .bodyValue(requestBody)
//                .retrieve()
//                .bodyToMono(String.class)
//                .map(this::extractResponseContent)
//                .onErrorResume(e -> Mono.just("Error: " + e.getMessage()));
//    }


    private String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate a same tone email reply (lengthy) for the following email content like professional to professional,,Please don't generate any subject line. ");
        prompt.append("Never send any subject line, should looks like a generated email");
        if (emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()) {
            prompt.append("Use a ").append(emailRequest.getTone()).append(" tone.");
        }
        prompt.append("\nOriginal email: \n").append(emailRequest.getEmailContent());
        return prompt.toString();
    }














































//    public Mono<String> generateAutoToneEmail(String rawEmail) {
//        String toneDetectPrompt = "Detect tone (friendly, professional, empathetic, or Hindi shayari, Romantic, consized and as same as the promt is given ....):\n" + rawEmail;
//
//        return callGemini(toneDetectPrompt)
//                .map(tone -> {
//                    String cleanedTone = (tone != null) ? tone.trim().toLowerCase() : "neutral";
//                    EmailRequest req = new EmailRequest();
//                    req.setPrompt(rawEmail);
//                    req.setTone(cleanedTone);
//                    return req;
//                })
//                .flatMap(this::generateEmailReply);
}
