package rootLab.service;

import com.google.firebase.messaging.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FirebaseMessagingService {

    private final FirebaseMessaging firebaseMessaging;

    @Autowired
    public FirebaseMessagingService(FirebaseMessaging firebaseMessaging) {
        this.firebaseMessaging = firebaseMessaging;
    }

    // 개별 토큰에 메시지 전송
    public void sendNotification(String token, String title, String body) throws FirebaseMessagingException {

        System.out.println("token = " + token + ", title = " + title + ", body = " + body);

        Notification notification = Notification.builder()
                .setTitle(title)
                .setBody(body)
                .build();

        Message message = Message.builder()
                .setToken(token)
                .setNotification(notification)
                .build();

//        // 🔧 수정된 서버 코드
//        Message message = Message.builder()
//                .setToken(token)
//                .putData("title", title)
//                .putData("body", body)
//                .build();

        firebaseMessaging.send(message);
    }

    // 여러 토큰에 한 번에 브로드캐스트 (여러 메시지)
    public void sendNotificationToAll(List<String> tokens, String title, String body) {
        for (String token : tokens) {
            try {
                sendNotification(token, title, body);
            } catch (FirebaseMessagingException e) {
                System.out.println("❌ 전송 실패 (" + token + ") : " + e.getMessage());
            }
        }
    }
}
