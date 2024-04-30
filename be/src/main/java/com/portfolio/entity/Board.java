package com.portfolio.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "boards")
@Getter @Setter
@ToString
public class Board extends BaseEntity{
    @Id
    @Column(name = "board_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false, length = 50)
    private String bTitle;

    @Column(nullable = false)
    private String bName;

    @Column(nullable = false)
    private String bNumber;

    @Column(nullable = false)
    private String bEmail;

    @Column(nullable = false)
    private String bText;

    @Column(nullable = false)
    private String bStack;

    @Lob
    @Column(nullable = false)
    private String bDetail;


}
