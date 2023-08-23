

interface GeoIP {
    country: string;
    region: string;
    city: string;
    latitude: number;
    longitude: number;
    zip: number;
    postal_code: string;
  }
  
  interface UserAgentParsed {
    agent_family: string;
    device_brand: string;
    device_family: string;
    os_family: string;
    os_version: string;
    is_mobile: boolean;
    is_proxy: boolean;
    is_prefetched: boolean;
  }
  
  interface EmailEvent {
    ab_test_id: string;
    ab_test_version: string;
    amp_enabled: boolean;
    campaign_id: string;
    click_tracking: boolean;
    customer_id: string;
    delv_method: string;
    event_id: string;
    friendly_from: string;
    geo_ip: GeoIP;
    injection_time: string;
    initial_pixel: boolean;
    ip_address: string;
    ip_pool: string;
    mailbox_provider: string;
    mailbox_provider_region: string;
    message_id: string;
    msg_from: string;
    msg_size: string;
    num_retries: string;
    open_tracking: boolean;
    queue_time: string;
    rcpt_meta: { [key: string]: string };
    rcpt_tags: string[];
    rcpt_to: string;
    rcpt_hash: string;
    raw_rcpt_to: string;
    rcpt_type: string;
    recipient_domain: string;
    routing_domain: string;
    scheduled_time: string;
    sending_ip: string;
    subaccount_id: string;
    subject: string;
    template_id: string;
    template_version: string;
    timestamp: string;
    transactional: string;
    transmission_id: string;
    type: string;
    user_agent: string;
    user_agent_parsed: UserAgentParsed;
  }
  
  export default EmailEvent;
  