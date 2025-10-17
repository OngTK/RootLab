package rootLab.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rootLab.model.mapper.PushMapper;

@Service
@RequiredArgsConstructor
public class PushService {

    private final PushMapper pushMapper;
}
